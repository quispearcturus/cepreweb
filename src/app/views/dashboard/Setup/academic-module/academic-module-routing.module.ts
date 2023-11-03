import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AcademicModuleComponent} from './academic-module.component';
import {AcademicModuleContainersComponent} from "./containers/academic-module-containers.component";
import {AcademicModuleEditComponent, AcademicModuleNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: AcademicModuleComponent,
    children: [
      {
        path: '',
        component: AcademicModuleContainersComponent,
        data:{
          title:'Módulo Académico'
        }
      },
      {
        path: 'new',
        component: AcademicModuleNewComponent,
        data: {
          title: 'Nuevo Módulo'
        }
      },
      {
        path: 'edit',
        component: AcademicModuleEditComponent,
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
export class AcademicModuleRoutingModule {
}

export const rutedComponents = [
  AcademicModuleContainersComponent,
  AcademicModuleComponent,
];
