import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgreementComponent } from './agreement.component';
import { AgreementContainerComponent } from "./containers/agreement-container.component";
import { AgreementEditComponent, AgreementNewComponent } from "./components";

const routes: Routes = [
  {
    path: '',
    component: AgreementComponent,
    children: [
      {
        path: '',
        component: AgreementContainerComponent,
        data:{
          title:'Institución Convenio'
        }
      },
      {
        path: 'new',
        component: AgreementNewComponent,
        data: {
          title: 'Nuevo Convenio'
        }
      },
      {
        path: 'edit',
        component: AgreementEditComponent,
        data: {
          title: 'Editar Convenio'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {
}

export const rutedComponents = [
  AgreementContainerComponent,
  AgreementComponent,
];
