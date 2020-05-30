import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  sankBardata: any={};
  private isAuthenticated = false;
  
  constructor(private http: HttpClient, private router: Router) {}
 }
