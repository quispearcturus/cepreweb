import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {LaboratorioRoutingModule, rutedComponents} from './laboratory-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {LaboratoryService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {LaboratoryFilterComponent} from "./components/filters/laboratory-filter.component";
import {LaboratoryEditComponent, LaboratoryListComponent, LaboratoryNewComponent} from "./components";

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  LaboratoryListComponent,
  LaboratoryNewComponent,
  LaboratoryEditComponent,
];

const SERVICES: any[] = [LaboratoryService];

const NG_MODULES: any = [];

const NGB_MODULES: any = [
  NgbModalModule,
  // NgbPopoverModule,
];
const PIPES: any = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LaboratorioRoutingModule,
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
    LaboratoryFilterComponent,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [],
  exports:[
    /*LaboratoryNewComponent*/
  ]
})
export class LaboratoryModule {
}
