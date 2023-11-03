import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {rutedComponents, UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './components/lists/user-list.component';
import {UserNewComponent} from './components/form/user-new.component';

import {UserRolesComponent} from './components/form/user-roles.component';
// importation { UsersService } from 'src/app/providers/services';
import {SignupService} from 'src/app/providers/services/oauth';
import {ConfirmDialogModule, FormsComponentValidModule} from "../../../../shared";
import {UserService} from "../../../../providers/services";
import { CardModule,ButtonModule,GridModule } from '@coreui/angular';

const SHARED_MODULES: any[] = [
  ConfirmDialogModule,
  FormsComponentValidModule
];

const COMPONENTS: any[] = [
  UserListComponent,
  UserNewComponent,
  UserRolesComponent
];

const SERVICES: any[] = [SignupService,UserService];

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
    UsersRoutingModule,
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
  entryComponents: [UserNewComponent, UserRolesComponent
  ],
})
export class UsersModule {
}
