import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TuitionComponent} from './tuition.component';
import {TuitionContainersComponent} from "./containers/tuition-containers.component";
import {TuitionNewComponent, VacanciesListComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: TuitionComponent,
    children: [
      {
        path: '',
        component: TuitionContainersComponent,
        data:{
          title:'Matriculas'
        }
      },
      {
        path: 'new',
        component: TuitionNewComponent,
        data: {
          title: 'Matricular'
        }
      },
      {
        path: 'vacancies',
        component: VacanciesListComponent,
        data: {
          title: 'vacancies'
        }
      },
    ],
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuitionRoutingModule {
}

export const rutedComponents = [
  TuitionContainersComponent,
  TuitionComponent,
];
