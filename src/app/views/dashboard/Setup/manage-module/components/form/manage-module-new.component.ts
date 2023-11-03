import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {abcForms, section,turne} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {AcademicModuleService} from "../../../../../../providers/services/setup/academic-module.service";
import {
  CicleService,
  CycleLevelService, LaboratoryService,
  ManageModuleService,
  SpecialtyService
} from "../../../../../../providers/services";
import {Cicle} from "../../../cicle/models/cicle";
import {Specialty} from "../../../specialities/models/specialty";
import {StaffService} from "../../../../../../providers/services/setup/staff.service";
import {Staff} from "../../../staffs/models/staff";
import {SectionAll} from "../../models/section-all";
import {Turne} from "../../models/turne";
import {ManageModule} from "../../models/manage-module";
import {Laboratory} from "../../../laboratories/models/laboratory";
import {AcademicModule} from "../../models/academic-module";

@Component({
  selector: 'app-staff-new',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
      <form [formGroup]=openingForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Nueva apertura</legend>
          <div class="row pb-2">
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Ciclo Academico. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="ciclo_academico_id"
                        id="ciclo_academico_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of cicles" [value]="l.id">{{l.anio}}-{{l.periodo}}</option>
                </select>
                <app-form-validate-errors [group]="openingForm"
                                          [controlName]="'ciclo_academico_id'"></app-form-validate-errors>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Especialidad. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="especialidad_id"
                        id="especialidad_id">
                  <option value=''>Selecciona la especicalidad</option>
                  <option *ngFor="let l of specialties" [value]="l.id">{{l.nombre}}</option>
                </select>
                <app-form-validate-errors [group]="openingForm"
                                          [controlName]="'especialidad_id'"></app-form-validate-errors>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Modulo Academico. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="modulo_id"
                        id="modulo_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of academicModules" [value]="l.id">{{l.nombre}}</option>
                </select>
                <app-form-validate-errors [group]="openingForm"
                                          [controlName]="'modulo_id'"></app-form-validate-errors>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Docente. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="personal_id"
                        id="personal_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of staffs" [value]="l.id">{{l.nombres}} {{l.apellido_pa}}  {{l.apellido_ma}}</option>
                </select>
                <app-form-validate-errors [group]="openingForm"
                                          [controlName]="'personal_id'"></app-form-validate-errors>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Laboratorio. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="laboratorio_id"
                        id="laboratorio_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of laboratorys" [value]="l.id">{{l.nombre}}</option>
                </select>
                <app-form-validate-errors [group]="openingForm"
                                          [controlName]="'laboratorio_id'"></app-form-validate-errors>
              </div>
            </div>
            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Turno. </b><span class="text-danger">(*)</span> </label>
                <select class="form-control form-select form-control-sm" formControlName="turno_id"
                        id="turno_id">
                  <option value="">Selecciona</option>
                  <option *ngFor="let l of turnes" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="openingForm"
                                        [controlName]="'turno_id'"></app-form-validate-errors>
            </div>

            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b> Hora de Inicio. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="time" class="form-control form-control-sm" formControlName="hora_inicio"
                       id="hora_inicio"
                       placeholder="12:40am">
              </div>
              <app-form-validate-errors [group]=openingForm
                                        [controlName]="'hora_inicio'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b> Hora de Culminación. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="time" class="form-control form-control-sm" formControlName="hora_fin"
                       id="hora_fin"
                       placeholder="12:40pm">
              </div>
              <app-form-validate-errors [group]=openingForm
                                        [controlName]="'hora_fin'"></app-form-validate-errors>
            </div>

            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Vacantes. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="number" class="form-control form-control-sm" formControlName="vacantes"
                       id="vacantes"
                       placeholder="7">
              </div>
              <app-form-validate-errors [group]=openingForm
                                        [controlName]="'vacantes'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Seccion. </b><span class="text-danger">(*)</span> </label>
                <select class="form-control form-select form-control-sm" formControlName="seccion"
                        id="seccion">
                  <option value="">Selecciona</option>
                  <option *ngFor="let l of sectionAlls" [value]="l.nombre">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="openingForm"
                                        [controlName]="'seccion'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-5">
              <div class="input-group input-group-sm input-group-rounded">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>Estado.</b></label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center">
                  <input type="checkbox" class="custom-control-input" id="estado"
                         formControlName="estado">
                  <label class="custom-control-label todo-label badge-gm" for="estado">
                    <span
                      class="badge text-bg-{{this.openingForm.value.estado ?'success': 'danger'}} text-white">{{this.openingForm.value.estado ? 'ACTIVO' : 'INACTIVO'}}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group col-md-5">
              <div class="input-group input-group-sm input-group-rounded">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>Ingresar la fecha de inicio y fin del módulo.</b></label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center">
                  <input type="checkbox" class="custom-control-input" id="isChecked"
                         formControlName="isChecked">
                  <label class="custom-control-label todo-label badge-gm" for="isChecked">
                    <span
                      class="badge text-bg-{openingForm.value.isChecked ?'success': 'danger'}} text-white">{{this.openingForm.value.isChecked ? 'ACTIVO' : 'INACTIVO'}}</span>
                  </label>
                </div>
              </div>
            </div>



            <div class="row col-12" [hidden]="!this.openingForm.value.isChecked">
              <div class="form-group col-md-5 required">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>Fecha de inicio. </b><span class="text-danger">(*)</span></label>
                </div>
                <div class="input-group input-group-sm input-group-rounded">
                  <input type="text" placeholder="Fecha (2023-01-26)"
                         class="form-control form-control-sm"
                         formControlName="fecha_inicio" ngbDatepicker #c="ngbDatepicker">
                  <div class="input-group-append">
                    <button class="btn btn-xs btn-primary text-white" type="button"
                            (click)="c.toggle()">
                      <i class="fa fa-calendar"></i>
                    </button>
                  </div>
                  <app-form-validate-errors [group]="openingForm"
                                            [controlName]="'fecha_inicio'"></app-form-validate-errors>
                </div>
              </div>
              <div class="form-group col-md-5 required">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>Fecha de culminación. </b><span class="text-danger">(*)</span></label>
                </div>
                <div class="input-group input-group-sm input-group-rounded">
                  <input type="text" placeholder="Fecha (2023-01-26)"
                         class="form-control form-control-sm"
                         formControlName="fecha_fin" ngbDatepicker #d="ngbDatepicker">
                  <div class="input-group-append">
                    <button class="btn btn-xs btn-primary text-white" type="button"
                            (click)="d.toggle()">
                      <i class="fa fa-calendar"></i>
                    </button>
                  </div>
                  <app-form-validate-errors [group]="openingForm"
                                            [controlName]="'fecha_fin'"></app-form-validate-errors>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <hr>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
        </button>
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="openingForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class ManageModuleNewComponent implements OnInit {
  //@Input() title: string = '';
  abcForms: any;
  public error: string = '';
  public cicles: Cicle[] = [];
  public specialties: Specialty[] = [];
  public staffs: Staff[] = [];
  public sectionAlls: SectionAll[] = [];
  public turnes: Turne[] = [];
  public manageModules: ManageModule[] = [];
  public academicModules: AcademicModule[] = [];
  public laboratorys: Laboratory[] = [];


  openingForm = new FormGroup({
    ciclo_academico_id: new FormControl('', [Validators.required]),
    especialidad_id: new FormControl('', [Validators.required]),
    modulo_id: new FormControl('', [Validators.required]),
    personal_id: new FormControl('', [Validators.required]),
    laboratorio_id: new FormControl('', [Validators.required]),
    turno_id: new FormControl('', [Validators.required]),
    hora_inicio: new FormControl('', [Validators.required]),
    hora_fin: new FormControl('', [Validators.required]),
    vacantes: new FormControl(0, [Validators.required]),
    seccion: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
    isChecked: new FormControl(false, [Validators.required]),
    fecha_inicio: new FormControl(''),
    fecha_fin: new FormControl(''),
  });

  constructor(
              private manageModuleService: ManageModuleService,
              private academicModuleService: AcademicModuleService,
              private cicleService: CicleService,
              private specialtyService: SpecialtyService,
              private staffService: StaffService,
              private laboratoryService: LaboratoryService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.sectionAlls = section;
    this.turnes = turne;
    this.getCicles();
    this.getSpecialties();
    this.getStaffs();
    this.getLaboratories();
    this.openingForm.controls['especialidad_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getAcademicModuleBySpecialtieId(val);
      }
    });
  }
  public getAcademicModuleBySpecialtieId(specialtieId:string): void {
    this.academicModuleService.getBySpecialtieId$(specialtieId).subscribe(response => {
      this.academicModules = response.data || [];
      // this.academicmodules = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
    }, error => {
      this.error = error;
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
  public getStaffs(): void {
    this.staffService.getAll$().subscribe(response => {
      this.staffs = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getLaboratories(): void {
    this.laboratoryService.getAll$().subscribe(response => {
      this.laboratorys = response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
  private addZero(value: string): string {
    let dataValue: string;
    if (+value < 10) {
      dataValue = '0' + value.toString();
    } else {
      dataValue = value;
    }
    return dataValue;
  }

  public saveForm(): void {
    if (this.openingForm.valid) {
      // @ts-ignore
      this.openingForm.value.fecha_inicio = `${this.openingForm.value.fecha_inicio.year}-${this.addZero(this.openingForm.value.fecha_inicio.month)}-${this.addZero(this.openingForm.value.fecha_inicio.day)}`;
      // @ts-ignore
      this.openingForm.value.fecha_fin = `${this.openingForm.value.fecha_fin.year}-${this.addZero(this.openingForm.value.fecha_fin.month)}-${this.addZero(this.openingForm.value.fecha_fin.day)}`;

      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        console.log(this.openingForm.value)
        this.manageModuleService.add$(this.openingForm.value).subscribe(response => {
          this.router.navigate(['../'], {relativeTo: this.route});
        }, error => {
          this.error = error;
        });
      }).catch(() => {
      });
    }
  }

  public cancelForm(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
