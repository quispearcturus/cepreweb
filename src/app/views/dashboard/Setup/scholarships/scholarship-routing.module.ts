import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScholarshipComponent } from './scholarship.component';
import { ScholarshipContainersComponent } from './containers/scholarship-containers.component';
import {
  ScholarshipEditComponent,
  ScholarshipNewComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: ScholarshipComponent,
    children: [
      {
        path: '',
        component: ScholarshipContainersComponent,
        data: {
          title: 'Beca',
        },
      },
      {
        path: 'new',
        component: ScholarshipNewComponent,
        data: {
          title: 'Nueva Beca',
        },
      },
      {
        path: 'edit',
        component: ScholarshipEditComponent,
        data: {
          title: 'Editar Beca',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BecaRoutingModule {}

export const rutedComponents = [
  ScholarshipContainersComponent,
  ScholarshipComponent,
];
