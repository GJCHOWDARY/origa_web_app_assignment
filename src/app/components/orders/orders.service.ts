import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.backendUrl + "/orders";
const BACKEND_URL_USERS = environment.backendUrl + "/users";

@Injectable({ providedIn: "root" })
export class OrderService { 
  constructor(private http: HttpClient, private router: Router) {}
  getOrders(PerPage: number, currentPage: number, search: string) {
    var queryParams = `?pagesize=${PerPage}&page=${currentPage}`;
    console.log(search);
    if(search){
      queryParams+=`&search=${search}`
    }
    return this.http.get(BACKEND_URL+'/getorders'+queryParams);
  }

  addOrder(sub_total: string, id: string) {
    const order ={
      sub_total: sub_total,
      userId: id
    }
    return this.http.post(BACKEND_URL+"/createorder", order)
  }

  getOrderById(id: string) {
     return this.http.get(BACKEND_URL+'/'+ id);
  }

  updateOrder(id: string, form: any) {
    form.id=id;
    return this.http.put(BACKEND_URL+"/"+id, form) 
  }

  deleteOrder(id: string) {
    return this.http.delete(BACKEND_URL+"/"+ id);
  }
     
search(search) {
  var queryParams='?'
    if(search){
      queryParams+=`search=${search}`
    }
    var listOfBooks = this.http.get(BACKEND_URL_USERS+'/search'+ queryParams)
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return data; 
            }
    ));
    return listOfBooks;  
} 
}
