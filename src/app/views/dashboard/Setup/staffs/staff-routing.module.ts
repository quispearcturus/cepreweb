import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StaffComponent} from './staff.component';
import {StaffContainersComponent} from "./containers/staff-containers.component";
import {StaffEditComponent, StaffNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: '',
        component: StaffContainersComponent,
        data:{
          title:'Personal'
        }
      },
      {
        path: 'new',
        component: StaffNewComponent,
        data: {
          title: 'Nuevo Personal'
        }
      },
      {
        path: 'edit',
        component: StaffEditComponent,
        data: {
          title: 'Editar Personal'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {
}

export const rutedComponents = [
  StaffContainersComponent,
  StaffComponent,
];
