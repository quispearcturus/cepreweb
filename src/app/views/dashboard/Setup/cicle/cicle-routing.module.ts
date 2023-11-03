import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CicleComponent} from './cicle.component';
import {CicleContainersComponent} from "./containers/cicle-containers.component";
import {CicleEditComponent, CicleNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: CicleComponent,
    children: [
      {
        path: '',
        component: CicleContainersComponent,
        data:{
          title:'Ciclo'
        }
      },
      {
        path: 'new',
        component: CicleNewComponent,
        data: {
          title: 'Nuevo ciclo'
        }
      },
      {
        path: 'edit',
        component: CicleEditComponent,
        data: {
          title: 'Editar Ciclo'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CicleRoutingModule {
}

export const rutedComponents = [
  CicleContainersComponent,
  CicleComponent,
];
