import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StudentComponent} from './student.component';
import {StudentContainersComponent} from "./containers/student-containers.component";
import {StudentEditComponent, StudentNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentContainersComponent,
        data:{
          title:'Estudiante'
        }
      },
      {
        path: 'new',
        component: StudentNewComponent,
        data: {
          title: 'Nuevo Estudiante'
        }
      },
      {
        path: 'edit',
        component: StudentEditComponent,
        data: {
          title: 'Editar Estudiante'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {
}

export const rutedComponents = [
  StudentContainersComponent,
  StudentComponent,
];
