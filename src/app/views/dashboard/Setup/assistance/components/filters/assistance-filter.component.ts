import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// @ts-ignore
import {abcForms} from 'src/environments/generals';
import { Cicle } from '../../../cicle/models/cicle';
import { Specialty } from '../../../specialities/models/specialty';
import { ManageModule } from '../../../manage-module/models/manage-module';
import { AcademicModule } from '../../../academic-module/models/academic-module';
import { CicleService, ManageModuleService, SpecialtyService } from 'src/app/providers/services';
import { AcademicModuleService } from 'src/app/providers/services/setup/academic-module.service';

@Component({
  selector: 'app-assistance-filter',
  template: `
    <div class="row">
      <div>
        <form [formGroup]=assistanceForm class="row mt-2 d-flex justify-content-start align-items-center ">
          <fieldset class="form-group">
            <legend class="bg-primary fs-5">ASISTENCIA</legend>
            <div class="row pb-2">
              <div class="form-group col-md-4 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Ciclo Academico. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="ciclo_academico_id"
                          id="ciclo_academico_id">
                    <option value=''>Selecciona</option>
                    <option *ngFor="let l of cicles" [value]="l.id">{{l.anio}}-{{l.periodo}}</option>
                  </select>
                  <app-form-validate-errors [group]="assistanceForm"
                                            [controlName]="'ciclo_academico_id'"></app-form-validate-errors>
                </div>
              </div>
            </div>
            <hr>
            <div class="row pb-2">
              <div class="form-group col-md-4 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Especialidad. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="especialidad_id"
                          id="especialidad_id">
                    <option value=''>Selecciona la Especicalidad</option>
                    <option *ngFor="let l of specialties" [value]="l.id">{{l.nombre}}</option>
                  </select>
                  <app-form-validate-errors [group]="assistanceForm"
                                            [controlName]="'especialidad_id'"></app-form-validate-errors>
                </div>
              </div>
              <div class="form-group col-md-4 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Modulo. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="modulo_id"
                          id="modulo_id">
                    <option value=''>Selecciona el Modulo</option>
                    <option *ngFor="let l of academicModules" [value]="l.id">{{l.nombre}}</option>
                  </select>
                  <app-form-validate-errors [group]="assistanceForm"
                                            [controlName]="'modulo_id'"></app-form-validate-errors>
                </div>
              </div>
              <div class="form-group col-md-4 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Turno. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="especialidad_modulo_id"
                          id="especialidad_modulo_id">
                    <option value=''>Selecciona el Turno</option>
                    <option *ngFor="let l of manageModules" [value]="l.id">{{l.turno_hora}}</option>
                  </select>
                  <app-form-validate-errors [group]="assistanceForm"
                                            [controlName]="'especialidad_modulo_id'"></app-form-validate-errors>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <hr>
      </div>
    </div>
  `
})
export class AssistanceFilterComponent implements OnInit {
 @Output() eventFilter = new EventEmitter<object>();
 abcForms: any;
 showNew = false;
 public error: string = '';
 public cicles: Cicle[] = [];
 public specialties: Specialty[] = [];
 public manageModules: ManageModule[] = [];
 public academicModules: AcademicModule[] = [];


 assistanceForm = new FormGroup({
   ciclo_academico_id: new FormControl('', [Validators.required]),
   especialidad_id: new FormControl('', [Validators.required]),
   modulo_id: new FormControl('', [Validators.required]),
   especialidad_modulo_id: new FormControl('', [Validators.required]),
 });

 constructor(
             private manageModuleService: ManageModuleService,
             private academicModuleService: AcademicModuleService,
             private cicleService: CicleService,
             private specialtyService: SpecialtyService) {
 }

  ngOnInit() {
    this.abcForms = abcForms;
    this.getCicles();
    this.getSpecialties();
    this.assistanceForm.controls['especialidad_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getAcademicModuleBySpecialtieId(val);
      }
    });
    this.assistanceForm.controls['modulo_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getTurnoByAcademicModuleId(val);
      }
    });
    this.assistanceForm.controls['especialidad_modulo_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getAsistenciaStudentsSpecialiteModuleId(val)
      }
    });
  }
  public getCicles(): void {
    this.cicleService.getAll$().subscribe(response => {
      this.cicles = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getSpecialties(): void {
    this.specialtyService.getAll$().subscribe(response => {
      this.specialties = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getAcademicModuleBySpecialtieId(specialtieId:string): void {
    this.academicModuleService.getBySpecialtieId$(specialtieId).subscribe(response => {
      this.academicModules = response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getTurnoByAcademicModuleId(academicModuleId:string): void {
    this.manageModuleService.getByAcademicModuleId$(academicModuleId).subscribe(response => {
      this.manageModules = response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getAsistenciaStudentsSpecialiteModuleId(val:string): void {
    console.log(this.assistanceForm.value);
    this.assistanceForm.value.especialidad_modulo_id=val;
    this.eventFilter.emit(this.assistanceForm.value);
  }
}
