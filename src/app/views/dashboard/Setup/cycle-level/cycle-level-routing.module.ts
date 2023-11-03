import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { CycleLevelComponent } from './cycle-level.component';
import { CycleLevelContainerComponent } from "./container/cycle-level-container.component";
import { CycleLevelEditComponent, CycleLevelNewComponent } from "./components";

const routes: Routes = [
  {
    path: '',
    component: CycleLevelComponent,
    children: [
      {
        path: '',
        component: CycleLevelContainerComponent,
        data:{
          title:'Nivel Ciclo'
        }
      },
      {
        path: 'new',
        component: CycleLevelNewComponent,
        data: {
          title: 'Nuevo Nivel de Ciclo'
        }
      },
      {
        path: 'edit',
        component: CycleLevelEditComponent,
        data: {
          title: 'Editar Nivel de Ciclo'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CycleLevelRoutingModule {
}

export const rutedComponents = [
  CycleLevelContainerComponent,
  CycleLevelComponent,
];
