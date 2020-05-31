import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service'
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  sidenavWidth = 6;
  userData: any=[];
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private toggleSubs: Subscription;
  email :string;
  role  :number;
  selectedFiles: File;
  userDetails:any={};
  isLoading = true; selectedfile=false;
  selectedFileName: string; 
  private userId: string; toggle: boolean=true;
  bufferValue=10;
  progressValue=0;brogressBar=false;
  constructor(private authService:AuthService) { }
 
  ngOnInit(): void { 
   } 


  increase(){
    this.sidenavWidth = 20;
    // console.log("increase sidenav width");
  }
  decrease(){
    this.sidenavWidth = 4;
    // console.log("decrease sidenav width");
  }
  onLogout() {
   }
}
