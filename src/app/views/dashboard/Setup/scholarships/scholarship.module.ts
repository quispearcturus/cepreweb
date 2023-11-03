import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  BecaRoutingModule,
  rutedComponents,
} from './scholarship-routing.module';
import {
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
} from '../../../../shared';

import { ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { ScholarshipService } from '../../../../providers/services';
import { AutoCompleteModule } from '../../../../shared/autocomplete';
import { ScholarshipFilterComponent } from './components/filters/scholarship-filter.component';
import {
  ScholarshipEditComponent,
  ScholarshipListComponent,
  ScholarshipNewComponent,
} from './components';

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule,
  PaginationModule,
  AutoCompleteModule,
];

const COMPONENTS: any[] = [
  ScholarshipListComponent,
  ScholarshipNewComponent,
  ScholarshipEditComponent,
];

const SERVICES: any[] = [ScholarshipService];

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
    BecaRoutingModule,
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
    ScholarshipFilterComponent,
  ],
  providers: [...SERVICES],
  entryComponents: [],
  exports: [
    /*ScholarshipNewComponent*/
  ],
})
export class ScholarshipModule {}
