import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AcademicModuleRoutingModule, rutedComponents} from './academic-module-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {CicleService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {AcademicModuleFilterComponent} from "./components/filters/academic-module-filter.component";
import {AcademicModuleEditComponent, AcademicModuleListComponent, AcademicModuleNewComponent} from "./components";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap"

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  AcademicModuleFilterComponent,
  AcademicModuleListComponent,
  AcademicModuleNewComponent,
  AcademicModuleEditComponent,

];

const SERVICES: any[] = [CicleService];

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
    AcademicModuleRoutingModule,
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
export class AcademicModuleModule {
}
