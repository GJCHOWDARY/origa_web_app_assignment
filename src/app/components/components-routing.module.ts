import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component'; 
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { UserBillsComponent } from './user-bills/user-bills.component';

const routes: Routes = [ 
  {
      path: '', component: ComponentsComponent, 
      children: [
        { 
          path: 'users', 
          component: UsersComponent
        }, { 
          path: 'orders', 
          component: OrdersComponent
        }, { 
          path: 'user_avg_bills', 
          component: UserBillsComponent
        }, 
        { 
          path: '', redirectTo: '', pathMatch: 'full' 
        },
      ]
     },
      { 
        path: '', redirectTo: '', pathMatch: 'full' 
      },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ComponentsRoutingModule { }
