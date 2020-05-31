import { Component, OnInit } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { OrderService } from "./orders.service";
import { CreateOrderComponent } from './create-order/create-order.component';

@Component({
  selector: 'app-roles',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orders: any= []
isLoading = false;
search:string;
PerPage = 10;
currentPage = 1;
count = 0;
orderSizeOptions = [10, 20, 50];
displayedColumns1: string[] = [ 'User Name','Amount' ,'Created At','Action'];

  constructor(
    public orderService: OrderService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
   ) {}

ngOnInit(): void {
    this.isLoading = true;
        this.orderService.getOrders(this.PerPage, this.currentPage, this.search).subscribe((roleData:any) => {
          this.orders=roleData.orders;
          this.count = roleData.count;
          this.isLoading = false;
        })
  }

onDelete(id: string){
    this.orderService.deleteOrder(id)
        .subscribe((resData :any) => { 
            this.ngOnInit();
      })
}
 
onSearch(){
this.ngOnInit();
}

onChangedPage(pageData: PageEvent) {
   this.currentPage = pageData.pageIndex + 1;
  this.PerPage = pageData.pageSize; 
  this.ngOnInit();
 }

 openDialog(id: number, mode:string) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {id: id,mode: mode};
  const dialogRef = this.dialog.open(CreateOrderComponent, dialogConfig);
  //------After close the dialog dataset Description will be changed
  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });
}

}
