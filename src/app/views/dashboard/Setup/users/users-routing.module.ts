import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersContainerComponent } from './containers/users-containers-component';
import { UsersComponent } from './users.component';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersContainerComponent,
        data: {
          title: 'Usuarios'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

export const rutedComponents = [
    UsersContainerComponent,
    UsersComponent,
];
