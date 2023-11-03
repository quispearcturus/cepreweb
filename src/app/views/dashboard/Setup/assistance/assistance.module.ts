import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AssistanceRoutingModule, rutedComponents} from './assistance-routing.module';
import {ConfirmDialogModule, FormsComponentValidModule, PaginationModule} from '../../../../shared';
import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {AssistanceService} from "../../../../providers/services";
import {AutoCompleteModule} from "../../../../shared/autocomplete";
import {AssistanceFilterComponent} from "./components/filters/assistance-filter.component";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap"
import {AssistanceNewComponent, AssistanceListComponent, AssistanceEditComponent} from "./components";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule
];

const COMPONENTS: any[] = [
  AssistanceFilterComponent,
  AssistanceListComponent,
  AssistanceNewComponent,
  AssistanceEditComponent,
];

const SERVICES: any[] = [AssistanceService];

const NG_MODULES: any = [];

const NGB_MODULES: any = [
  NgbModalModule,
  NgbDatepickerModule,
];
const PIPES: any = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssistanceRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    NgbModule,
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
export class AssistanceModule {
}
