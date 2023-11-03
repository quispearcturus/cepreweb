import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ManageSpecializedUnitsComponent } from './manage-specialized-units.component';
import { ManageSpecializedUnitsContainersComponent } from './containers/manage-specialized-units-containers.component';
import { ManageSpecializedUnitsListComponent } from './components';
import {ManageSpecializedUnitsEditComponent} from "./components/form/manage-specialized-units-edit.component";
// import { ManageSpecializedUnitsEditComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ManageSpecializedUnitsComponent,
    children: [
      {
        path: '',
        component: ManageSpecializedUnitsContainersComponent,
        data:{
          title:'Gestionar Unidades de Modulos'
        }
      },
      {
        path: 'edit',
        component: ManageSpecializedUnitsEditComponent,
        data: {
          title: 'Editar Unidades de Módulo'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSpecializedUnitsRoutingModule {
}

export const rutedComponents = [
  ManageSpecializedUnitsContainersComponent,
  ManageSpecializedUnitsComponent,
];
