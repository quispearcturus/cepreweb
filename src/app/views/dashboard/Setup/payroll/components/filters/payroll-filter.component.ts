import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// @ts-ignore
import {abcForms} from 'src/environments/generals';
import { ManageModule } from '../../../manage-module/models/manage-module';
import { CicleService } from 'src/app/providers/services';
import { Cicle } from '../../../cicle/models/cicle';
import { StaffService } from 'src/app/providers/services/setup/staff.service';
import { Staff } from '../../../staffs/models/staff';

@Component({
  selector: 'app-payroll-filter',
  template: `
  <div class="row">
    <div>
      <form [formGroup]=payrollForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <fieldset class="form-group">
          <div class="form-group col-md-4 ">
            <div class="input-group input-group-sm input-group-rounded row mx-auto">
              <label class="col-form-label"><b>Ciclo Academico. </b> </label>
              <select class="form-control form-select form-control-sm" formControlName="ciclo_academico_id"
                      id="ciclo_academico_id">
                <option value=''>Selecciona</option>
                <option *ngFor="let l of cicles" [value]="l.id">{{l.anio}}-{{l.periodo}}</option>
              </select>
              <app-form-validate-errors [group]="payrollForm"
                                        [controlName]="'ciclo_academico_id'"></app-form-validate-errors>
            </div>
          </div>
          <div class="form-group col-md-4 mb-2">
            <div class="input-group input-group-sm input-group-rounded row mx-auto">
              <label class="col-form-label"><b>Docente. </b> </label>
              <select class="form-control form-select form-control-sm" formControlName="staff_id"
                      id="staff_id">
                <option value=''>Selecciona</option>
                <option *ngFor="let l of staffs" [value]="l.id">
                  {{l.nombres}}
                </option>
              </select>
              <app-form-validate-errors [group]="payrollForm"
                                          [controlName]="'staff_id'"></app-form-validate-errors>
            </div>
          </div>
        </fieldset>
      </form>
      <hr>
    </div>
  </div>
`
})
export class PayrollFilterComponent implements OnInit {
  @Output() eventFilter = new EventEmitter<object>();
 abcForms: any;
 public error: string = '';
 public cicles: Cicle[] = [];
 public staffs: Staff[] = [];
 public manageModules: ManageModule[] = [];


 payrollForm = new FormGroup({
    ciclo_academico_id: new FormControl('', [Validators.required]),
    staff_id: new FormControl('', [Validators.required]),
  });

 constructor(
  private cicleService: CicleService,
  private staffService: StaffService,) {
 }

  ngOnInit() {
    this.abcForms = abcForms;
    this.getCicles();
    this.getStaffs();
  }

  public getCicles(): void {
    this.cicleService.getAll$().subscribe(response => {
      this.cicles = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getStaffs(): void {
    this.staffService.getAll$().subscribe(response => {
      this.staffs = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
}
