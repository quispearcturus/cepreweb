import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageModuleRoutingModule, rutedComponents} from './manage-module-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {ManageModuleService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {ManageModuleFilterComponent} from "./components/filters/manage-module-filter.component";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap"
import {ManageModuleNewComponent, ManageModuleListComponent, ManageModuleEditComponent} from "./components";

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  ManageModuleFilterComponent,
  ManageModuleListComponent,
  ManageModuleNewComponent,
  ManageModuleEditComponent


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
    ManageModuleRoutingModule,
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
export class ManageModuleModule {
}
