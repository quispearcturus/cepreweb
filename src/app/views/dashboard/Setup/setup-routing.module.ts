import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SetupComponent} from './setup.component';

const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
    children: [
      {
        path: 'rol',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'specialty',
        loadChildren: () => import('./specialities/specialty.module').then(m => m.SpecialtyModule),
      },
      {
        path: 'cicle',
        loadChildren: () => import('./cicle/cicle.module').then(m => m.CicleModule),
      },
      {
        path: 'laboratory',
        loadChildren: () => import('./laboratories/laboratory.module').then(m => m.LaboratoryModule),
      },
      {
        path: 'scholarship',
        loadChildren: () => import('./scholarships/scholarship.module').then(m => m.ScholarshipModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./students/student.module').then(m => m.StudentModule),
      },
      {
        path: 'staff',
        loadChildren: () => import('./staffs/staff.module').then(m => m.StaffModule),
      },
      {
        path: 'academic-module',
        loadChildren: () => import('./academic-module/academic-module.module').then(m => m.AcademicModuleModule),
      },
      {
        path: 'agreement',
        loadChildren: () => import('./agreement/agreement.module').then(m => m.AgreementModule),
      },
      {
        path: 'cycle-level',
        loadChildren: () => import('./cycle-level/cycle-level.module').then(m => m.CycleLevelModule),
      },
      {
        path: 'manage-module',
        loadChildren: () => import('./manage-module/manage-module.module').then(m => m.ManageModuleModule),
      },
      {
        path: 'manage-specialized',
        loadChildren: () => import('./manage-specialized-units/manage-specialized-units.module').then(m => m.ManageSpecializedUnitsModule),
      },
      {
        path: 'payroll',
        loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollModule),
      },
      {
        path: 'tuition',
        loadChildren: () => import('./tuition/tuition.module').then(m => m.TuitionModule),
      },
      {
        path: 'assistance',
        loadChildren: () => import('./assistance/assistance.module').then(m => m.AssistanceModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {
}

