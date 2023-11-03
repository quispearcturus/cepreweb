import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RolesContainerComponent } from './containers/roles-container.component';
const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: '',
        component: RolesContainerComponent,
        data: {
          title: 'Roles'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule { }

export const rutedComponents = [
    RolesContainerComponent,
    RolesComponent,
];
