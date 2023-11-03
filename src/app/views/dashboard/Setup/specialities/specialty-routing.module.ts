import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SpecialtyComponent} from './specialty.component';
import {SpecialtyContainersComponent} from "./containers/specialty-containers.component";
import {SpecialtyEditComponent, SpecialtyNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: SpecialtyComponent,
    children: [
      {
        path: '',
        component: SpecialtyContainersComponent,
        data:{
          title:'Especialidad'
        }
      },
      {
        path: 'new',
        component: SpecialtyNewComponent,
        data: {
          title: 'Nueva Especialidad'
        }
      },
      {
        path: 'edit',
        component: SpecialtyEditComponent,
        data: {
          title: 'Editar Especialidad'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialtyRoutingModule {
}

export const rutedComponents = [
  SpecialtyContainersComponent,
  SpecialtyComponent,
];
