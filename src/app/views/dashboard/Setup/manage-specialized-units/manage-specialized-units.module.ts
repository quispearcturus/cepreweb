import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {rutedComponents} from './manage-specialized-units-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap"
import { ManageSpecializedUnitsFilterComponent } from './components/filters/manage-specialized-units-filter.component';
import { ManageSpecializedUnitsListComponent } from './components';
import { ManageSpecializedUnitsRoutingModule } from './manage-specialized-units-routing.module';
import { ManageModuleService } from '../../../../providers/services/setup/manage-module.service';
import {ManageSpecializedUnitsEditComponent} from "./components/form/manage-specialized-units-edit.component";

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  ManageSpecializedUnitsFilterComponent,
  ManageSpecializedUnitsListComponent,
  ManageSpecializedUnitsEditComponent,
];

const SERVICES: any[] = [ManageModuleService];

const NG_MODULES: any = [];

const NGB_MODULES: any = [
  NgbModalModule,
  NgbDatepickerModule,
  // NgbPopoverModule,
];
const PIPES: any = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageSpecializedUnitsRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    ...SHARED_MODULES,
    ...NG_MODULES,
    ...NGB_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    ...rutedComponents,
    ...PIPES,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [],
  exports:[
  ]
})
export class ManageSpecializedUnitsModule {
}
