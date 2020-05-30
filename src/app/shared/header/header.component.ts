import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false; 
  private toggelListener = new Subject<boolean>();
 
  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
  }

}
