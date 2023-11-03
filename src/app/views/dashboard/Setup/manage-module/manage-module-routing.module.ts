import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageModuleComponent} from './manage-module.component';
import {ManageModuleContainersComponent} from "./containers/manage-module-containers.component";
import {ManageModuleEditComponent, ManageModuleNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: ManageModuleComponent,
    children: [
      {
        path: '',
        component: ManageModuleContainersComponent,
        data:{
          title:'Especialidades/Módulos agregados'
        }
      },
      {
        path: 'new',
        component: ManageModuleNewComponent,
        data: {
          title: 'Aperturar Módulo'
        }
      },
      {
        path: 'edit',
        component: ManageModuleEditComponent,
        data: {
          title: 'Editar Módulo'
        }
      },

    ],
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageModuleRoutingModule {
}

export const rutedComponents = [
  ManageModuleContainersComponent,
  ManageModuleComponent,
];
