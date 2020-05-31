import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { UsersService } from "../../users/user.service";
import { User } from "../../users/user.model";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: "app-dataset-create",
  templateUrl: "./create-users.component.html",
  styleUrls: ["./create-users.component.css"]
})

export class CreateUsersComponent implements OnInit, OnDestroy {
  searchTerm : FormControl = new FormControl();
  searchUser: any=[];
  user:any={};
  data: any =[];
  isLoading = true; 
  isEdit = false;  
  mode = "create"; 
  private userId: string; 
  currentPage = 1;  
  
  constructor(
    public userService: UsersService,
    private dialogRef: MatDialogRef<CreateUsersComponent>,
    public route: ActivatedRoute,
    private router: Router,private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {
      console.log(data,"0000000")
      this.data = data;    
    }

ngOnInit() {          
    if(this.data.id && this.data.mode=='edit'){
        this.mode = "edit"; 
        this.isEdit = false;
          this.userService.getUser(this.data.id).subscribe( (userData: any) => {
            this.isLoading = false;
            this.user=userData.user[0];
          });
      } else {
        this.isLoading = false;
        this.mode = "create";
        this.isEdit =true;
        this.userId = null;
      }
  }

// TODO: User
onSaveUser(form: NgForm) {
 if (form.invalid) {
     return;
   }
   this.isLoading = true;
   if (this.mode === "create") {
     this.userService.addUser(form).subscribe(responseData => {
        this.dialogRef.close();
          form.reset();
        },error => {  
          this.isLoading = false;
      });
    } else {
     this.userService.updateUser(this.data.id,form)
        .subscribe(responseData => {
          this.dialogRef.close();
          form.reset();
        },error => {
          this.isLoading = false;
      });
   }
 }
  
close() {
    this.dialogRef.close();
}

ngOnDestroy() {
  }
}
