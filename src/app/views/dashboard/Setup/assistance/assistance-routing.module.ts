import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AssistanceComponent} from './assistance.component';
import {AssistanceContainersComponent} from "./containers/Assistance-containers.component";
import {AssistanceEditComponent, AssistanceNewComponent, AssistanceListComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: AssistanceComponent,
    children: [
      {
        path: '',
        component: AssistanceContainersComponent,
        data:{
          title:'Asistencia'
        }
      },
      // {
      //   path: 'new',
      //   component: AssistanceNewComponent,
      //   data: {
      //     title: 'Asistencias'
      //   }
      // },
      // {
      //   path: 'list',
      //   component: AssistanceListComponent,
      //   data: {
      //     title: 'Asistencias'
      //   }
      // },

    ],
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceRoutingModule {
}

export const rutedComponents = [
  AssistanceContainersComponent,
  AssistanceComponent,
];
