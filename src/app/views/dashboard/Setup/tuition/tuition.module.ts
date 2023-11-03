import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {TuitionRoutingModule, rutedComponents} from './tuition-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {TuitionService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {TuitionFilterComponent} from "./components/filters/tuition-filter.component";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap"
import {TuitionNewComponent, TuitionListComponent, TuitionEditComponent, VacanciesListComponent} from "./components";
import {TuitionEditCommentsComponent} from "./components/form/tuition-edit-comments.component";
import {TuitionViewVoucherComponent} from "./components/form/tuition-view-voucher.component";

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  TuitionFilterComponent,
  TuitionListComponent,
  TuitionNewComponent,
  TuitionEditComponent,
  VacanciesListComponent,
  TuitionEditCommentsComponent,
  TuitionViewVoucherComponent
];

const SERVICES: any[] = [TuitionService];

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
    TuitionRoutingModule,
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
export class TuitionModule {
}
