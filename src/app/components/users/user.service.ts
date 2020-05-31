import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { User } from "./user.model";

const BACKEND_URL = environment.backendUrl + "/users"; 
const BACKEND_URL_ORDER = environment.backendUrl + "/orders"; 

@Injectable({ providedIn: "root" })
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[]; userCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

getUsers(usersPerPage: number, currentPage: number, search: string) {
    var queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    if(search){
      queryParams+=`&search=${search}`
    }
    this.http
    .get<{ message: string; users: any; userCount: number }>(
      BACKEND_URL+'/getusers' + queryParams
    )
    .pipe(
      map(userData => {
        return {
          users: userData.users,
          userCount: userData.userCount
        };
      })
    )
    .subscribe(transformedPostData => {
      console.log(transformedPostData,"9999999")
      this.users = transformedPostData.users;
      this.usersUpdated.next({
        users: [...this.users],
        userCount: transformedPostData.userCount
      });
    });
  }

getUser(id: string) {
  return this.http.get(BACKEND_URL+'/'+ id);
  }
   
getUserOrderDetails() {
  return this.http.get(BACKEND_URL+'/orderdetails');
 }

search(search) {
  var queryParams='?'
    if(search){
      queryParams+=`search=${search}`
    }
    var listOfBooks = this.http.get(BACKEND_URL+'/search'+ queryParams)
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return data; 
            }
    ));
    return listOfBooks;  
} 

addUser(form: NgForm) { 
    return this.http.post<{ message: string; users: any }>(BACKEND_URL+"/", form.value )    
  }

updateUser(id: string,form: NgForm) {
  console.log(form.value)
  const user ={ id: id,
                email: form.value.email,
                name: form.value.name,
                no_of_orders: form.value.no_of_orders
               };
    return this.http.put(BACKEND_URL+"/"+id, user)
  }

randomUpdate() {
    return this.http.get(BACKEND_URL+"/updateall")
  }

deleteUser(id: string) {
    return this.http.delete(BACKEND_URL+"/"+ id);
  }

getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

}
