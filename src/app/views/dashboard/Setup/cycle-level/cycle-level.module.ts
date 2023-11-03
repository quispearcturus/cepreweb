import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CycleLevelRoutingModule, rutedComponents} from './cycle-level-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {CycleLevelService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {CycleLevelFilterComponent} from "./components/filters/cycle-level-filter.component";
import {CycleLevelEditComponent, CycleLevelListComponent, CycleLevelNewComponent} from "./components";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap"

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  CycleLevelFilterComponent,
  CycleLevelListComponent,
  CycleLevelNewComponent,
  CycleLevelEditComponent,

];

const SERVICES: any[] = [CycleLevelService];

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
    CycleLevelRoutingModule,
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
export class CycleLevelModule {
}
