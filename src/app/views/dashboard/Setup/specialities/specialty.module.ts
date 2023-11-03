import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SpecialtyRoutingModule, rutedComponents} from './specialty-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';

import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {SpecialtyService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {SpecialtyFilterComponent} from "./components/filters/specialty-filter.component";
import {SpecialtyEditComponent, SpecialtyListComponent, SpecialtyNewComponent} from "./components";

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  SpecialtyListComponent,
  SpecialtyNewComponent,
  SpecialtyEditComponent,
];

const SERVICES: any[] = [SpecialtyService];

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
    SpecialtyRoutingModule,
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
    SpecialtyFilterComponent,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [],
  exports:[
    /*VehicleNewComponent*/
  ]
})
export class SpecialtyModule {
}
