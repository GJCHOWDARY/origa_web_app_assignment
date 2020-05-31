import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { OrderService } from "../orders.service";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  isLoading = false;
  order: any=[]; disablerole = true;
  data: any= [];
  searchUser:any=[];
  mode : string;
  isEdit =true;
  userId = null;

  constructor(public orderService: OrderService,
              private dialogRef: MatDialogRef<CreateOrderComponent>,
              public route: ActivatedRoute,
              private router: Router,private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) data) {
                this.data = data;
            }

  ngOnInit() {
    if (this.data.id  && this.data.mode=='edit') {
          this.orderService.getOrderById(this.data.id).subscribe( (roleData: any) => {
            this.isLoading = false;
            this.isEdit =true;
            this.mode = "edit";
            console.log('ttt',roleData)
            this.order =roleData.order[0]
          });
        }else {
          this.isLoading = false;
          this.mode = "create";
          this.isEdit =false;
          this.userId = null;
        }
      }

onSaveRole(form: NgForm) {
  if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.orderService.addOrder(form.value.sub_total,form.value.userId._id)
          .subscribe(responseData => { 
            this.dialogRef.close();
        },error => {
          this.isLoading = false;
       });
     } else {
      this.orderService.updateOrder(this.order._id, form.value)
          .subscribe(responseData => { 
              this.dialogRef.close();
        },error => {
          this.isLoading = false;
       });
    }
 }

searchUsers(term: string){
  this.orderService.search(term).subscribe(
    data => {
      this.searchUser = data.users;
  })
}

displayFn(user: any): string {
  return user ? user.name : '';
}

 close() {
  this.dialogRef.close();
   }
}
