import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './Components/role/role.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {path: "users" , component : UserComponent},
  {path: "roles", component : RoleComponent},
  {path: "", redirectTo: '/users', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
