import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ComponentsRoutingModule } from './components-routing.module'
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { UserBillsComponent } from './user-bills/user-bills.component';

@NgModule({
  declarations: [ComponentsComponent, OrdersComponent, UsersComponent, CreateUsersComponent, CreateOrderComponent, UserBillsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ComponentsRoutingModule,
  ]
})
export class ComponentsModule { }
