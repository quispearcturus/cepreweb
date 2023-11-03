import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LaboratoryComponent} from './laboratory.component';
import {LaboratoryContainersComponent} from "./containers/laboratory-containers.component";
import {LaboratoryEditComponent, LaboratoryNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: LaboratoryComponent,
    children: [
      {
        path: '',
        component: LaboratoryContainersComponent,
        data:{
          title:'Laboratorio'
        }
      },
      {
        path: 'new',
        component: LaboratoryNewComponent,
        data: {
          title: 'Nueva Laboratorio'
        }
      },
      {
        path: 'edit',
        component: LaboratoryEditComponent,
        data: {
          title: 'Editar Laboratorio'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratorioRoutingModule {
}

export const rutedComponents = [
  LaboratoryContainersComponent,
  LaboratoryComponent,
];

