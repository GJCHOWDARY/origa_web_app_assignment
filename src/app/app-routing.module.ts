import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { 
    path: '', component: HomeComponent 
  },
  {
    path: '', redirectTo: '', pathMatch: 'full' 
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
