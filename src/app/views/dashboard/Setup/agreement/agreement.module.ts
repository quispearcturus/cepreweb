import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgreementRoutingModule, rutedComponents } from './agreement-routing.module';
import { ConfirmDialogModule, FormsComponentValidModule, PaginationModule } from '../../../../shared';

import { ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { InstitutionAgreementService } from "../../../../providers/services";
import { AutoCompleteModule } from "../../../../shared/autocomplete";
import { AgreementFilterComponent } from "./components/filters/agreement-filter.component";
import { AgreementEditComponent, AgreementListComponent, AgreementNewComponent } from "./components";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap"

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  AgreementFilterComponent,
  AgreementListComponent,
  AgreementNewComponent,
  AgreementEditComponent,

];

const SERVICES: any[] = [InstitutionAgreementService];

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
    AgreementRoutingModule,
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
export class AgreementModule {
}
