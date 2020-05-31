import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/user.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-user-bills',
  templateUrl: './user-bills.component.html',
  styleUrls: ['./user-bills.component.css']
})
export class UserBillsComponent implements OnInit {
 avgBillTotal:any=[];
 isLoading = false; 
 currentPage = 1;
 userCount = 0;
 usersPerPage = 10;
 search: string;
 userSizeOptions = [10, 20, 50];
 displayedColumns: string[] = ['Name' ,'Email','No of Orders', 'Avg Bill Amount', 'Created At' ,'Status']; 

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserOrderDetails().subscribe((res:any) => {
      this.avgBillTotal=res.data;
      console.log(res,"-----")
    }); 
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.usersService.getUsers(this.usersPerPage, this.currentPage, this.search);
  }

}
