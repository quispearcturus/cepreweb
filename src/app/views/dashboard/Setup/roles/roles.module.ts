import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {RolesRoutingModule, rutedComponents} from './roles-routing.module';
import {RolesAssignComponent, RolesListComponent} from './components';
import {RolesNewComponent} from './components/form/roles-new.component';
//import {ConfirmDialogModule} from '../../../shared/confirm-dialog';
//import {FormsComponentValidModule} from '../../../shared/components';
import {RolesEditComponent} from './components/form/roles-edit.component';
import {ModuleService, RolService} from 'src/app/providers/services';
import {ConfirmDialogModule, FormsComponentValidModule} from "../../../../shared";
import { CardModule,ButtonModule,GridModule } from '@coreui/angular';


const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule
];

const COMPONENTS: any[] = [
  RolesListComponent,
  RolesNewComponent,
  RolesEditComponent,
  RolesAssignComponent
];

const SERVICES: any[] = [
  ModuleService, RolService
];

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
    RolesRoutingModule,
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
  entryComponents: [RolesNewComponent, RolesEditComponent, RolesAssignComponent],
})
export class RolesModule {
}
