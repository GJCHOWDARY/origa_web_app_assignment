import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AuthService } from "./auth/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  sankBardata: any={};
  horizontalPos:MatSnackBarHorizontalPosition ='right';
  verticalPos:MatSnackBarVerticalPosition ='top'; 
  connectionStatus: string;
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  title = 'Origa.ai';
  userData: any=[]; 

  constructor(public authService: AuthService, private router: Router,private _snackBar: MatSnackBar,
     private activatedRoute: ActivatedRoute) {
     
  }

ngOnInit(): void {
 
}

openSnakBar(){
  let config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPos;
  config.horizontalPosition = this.horizontalPos;
  config.duration=8000; 
   this._snackBar.open(this.sankBardata.message, 'Ok', config);
  }

ngOnDestroy(): void {
  /** Unsubscribe all subscriptions to avoid memory leak */
 } 
}
