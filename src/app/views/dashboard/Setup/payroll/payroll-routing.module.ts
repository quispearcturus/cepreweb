import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { PayrollComponent } from './payroll.component';
import { PayrollContainersComponent } from './containers/payroll-containers.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollComponent,
    children: [
      {
        path: '',
        component: PayrollContainersComponent,
        data:{
          title:'Nóminas'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollRoutingModule {
}

export const rutedComponents = [
  PayrollContainersComponent,
  PayrollComponent,
];
