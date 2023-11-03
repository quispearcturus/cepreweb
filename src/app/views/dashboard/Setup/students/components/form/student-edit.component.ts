import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms, estado_civil} from 'src/environments/generals';
import {CicleService} from "../../../../../../providers/services";
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../models/student";
import {StudentService} from "../../../../../../providers/services/setup/student.service";
import {StatusCivil} from "../../models/status-civil";
import {Dep, Dist, Prov} from "../../../staffs/models/ubigeo";
import {GradeInstruction} from "../../../staffs/models/grade-instruction";
import {UbigeoService} from "../../../../../../providers/services/setup/ubigeo.service";
import {GradeInstructionService} from "../../../../../../providers/services/setup/grade-instruction.service";
import {Cicle} from "../../../cicle/models/cicle";

@Component({
  selector: 'app-student-edit',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
      <form [formGroup]=studentForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <fieldset class="form-group mt-2">
          <legend class="bg-primary fs-5">Datos Principales</legend>
          <div class="row">
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b> NOMBRES. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="nombres"
                       id="nombres"
                       placeholder="Nombres">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'nombres'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>APELLIDO PATERNO. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="apellido_pa"
                       id="apellido_pa"
                       placeholder="Apellido Paterno">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'apellido_pa'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>APELLIDOS MATERNO. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="apellido_ma"
                       id="apellido_ma"
                       placeholder="Apellido Materno">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'apellido_ma'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>DNI. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="dni"
                       id="dni"
                       placeholder="DNI">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'dni'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>EMAIL. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="email" class="form-control form-control-sm" formControlName="correo_electronico"
                       id="correo_electronico"
                       placeholder="Email">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'correo_electronico'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>CELULAR. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="email" class="form-control form-control-sm" formControlName="celular"
                       id="celular"
                       placeholder="Celular">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'celular'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>SEXO. </b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <div class="form-check form-check-inline">
                  <input class="form-check-input bg-info" type="radio" formControlName="sexo" value="M">
                  <label class="form-check-label">Varon</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input bg-danger" type="radio" formControlName="sexo" value="F">
                  <label class="form-check-label">Mujer</label>
                </div>
              </div>
            </div>
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>ESTADO CIVIL. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="estado_civil_id"
                        id="estado_civil_id">
                  <option value="">Selecciona</option>
                  <option *ngFor="let l of statusCivils" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="studentForm"
                                        [controlName]="'estado_civil_id'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Fecha Nac. </b><span class="text-danger">(*)</span></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" placeholder="Fecha (2023-01-26)"
                       class="form-control form-control-sm"
                       formControlName="fe_nacimiento" ngbDatepicker #d="ngbDatepicker">
                <div class="input-group-append">
                  <button class="btn btn-xs btn-primary text-white" type="button"
                          (click)="d.toggle()">
                    <i class="fa fa-calendar"></i>
                  </button>
                </div>
                <app-form-validate-errors [group]="studentForm"
                                          [controlName]="'fe_nacimiento'"></app-form-validate-errors>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="form-group mt-2">
          <legend class="bg-primary fs-5">Datos Secundarios</legend>
          <div class="row pb-2">
            <div class="form-group col-md-4">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Departamento. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="departamento_id"
                        id="departamento_id" (change)="getProvince($event)">
                  <option value="">Selecciona Departamento</option>
                  <option *ngFor="let l of Deps" [value]="l.cod_dep_sunat">
                    {{l.desc_dep_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="studentForm"
                                        [controlName]="'departamento_id'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Provincia. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="provincia_id"
                        id="provincia_id" (change)="getDistrite($event)">
                  <option value="">Selecciona Provincia</option>
                  <option *ngFor="let l of Provs" [value]="l.cod_prov_sunat">
                    {{l.desc_prov_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="studentForm"
                                        [controlName]="'provincia_id'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4">
              <div class="input-group input-group-sm input-group-rounded row mx-auto" >
                <label class="col-form-label"><b>Distrito. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="distrito_id"
                        id="distrito_id">
                  <option value="">Selecciona Distrito</option>
                  <option *ngFor="let l of Dists" [value]="l.cod_ubigeo_sunat">
                    {{l.desc_ubigeo_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="studentForm"
                                        [controlName]="'distrito_id'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Direccción Actual. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="direccion"
                       id="direccion"
                       placeholder="Dirección">
              </div>
              <app-form-validate-errors [group]=studentForm
                                        [controlName]="'direccion'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Grado Instrucción. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="grado_instruccion_id"
                        id="grado_instruccion_id">
                  <option value=0>Selecciona Grado</option>
                  <option *ngFor="let l of gradeInstructions" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
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
                [disabled]="studentForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class StudentEditComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public idStudent: number = 0;
  public student = new Student();
  public statusCivils: StatusCivil[] = [];
  public Deps: Dep[] = [];
  public Provs: Prov[] = [];
  public Dists: Dist[] = [];
  public gradeInstructions: GradeInstruction[] = [];

  studentForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellido_pa: new FormControl('', [Validators.required]),
    apellido_ma: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    correo_electronico: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    sexo: new FormControl('1'),
    fe_nacimiento: new FormControl(''),
    direccion: new FormControl('', [Validators.required]),
    codigo: new FormControl(''),
    departamento_id: new FormControl('', [Validators.required]),
    provincia_id: new FormControl('', [Validators.required]),
    distrito_id: new FormControl('', [Validators.required]),
    estado_civil_id: new FormControl(1),
    grado_instruccion_id: new FormControl(1),
  });


  constructor(private studentService: StudentService,
              private ubigeoService: UbigeoService,
              private gradeinstructionService: GradeInstructionService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.route.params.subscribe(res => {
      this.idStudent = parseInt(res['idStudent']);
      this.GetById(this.idStudent);

    });
    this.getStatusCivil();
    this.getUbigeo();
    this.getListGradeInstructions();
  }

  public getStatusCivil(): void {
    this.statusCivils = estado_civil;
    /*this.studentService.getStatusCivil$().subscribe(response => {
      this.statusCivils = response && response.data || [];
    }, error => {
      this.error = error;
    });*/
  }
  public getUbigeosProv(id: string):void {
    this.ubigeoService.getUbigeoProvince$(id).subscribe(response => {
      this.Provs = response.data || []
    })
  }
  public getUbigeosDist(id: string):void {
    this.ubigeoService.getUbigeoDistric$(id).subscribe(response => {
      this.Dists = response.data || []
    })
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
  private patchDateObject(date: any) {
    if (date && date.year && date.month) {
      return date;
    } else {
      if (date && date.split('-')) {
        const s = date.split('-');
        return {year: +s[0], month: +s[1], day: +s[2].substring(0, 2)};
      } else {
        return null;
      }
    }
  }
  public getUbigeo(): void {
    this.ubigeoService.getUbigeoDepartment$().subscribe(response => {
      this.Deps = response.data;
    });
  }

  public getProvince(event: any):void {
    this.ubigeoService.getUbigeoProvince$(event.target.value).subscribe(response => {
      this.Provs = response.data || []
    })
  }
  public getDistrite(event: any):void {
    this.ubigeoService.getUbigeoDistric$(event.target.value).subscribe(response => {
      this.Dists = response.data || []
    })
  }
  public getListGradeInstructions(): void {
    this.gradeinstructionService.getAll$().subscribe(response => {
      this.gradeInstructions = response.data.data || []
    });
  }

  GetById(idStudent: number): void {
    this.studentService.getById$(idStudent).subscribe(response => {
      this.student = response.data;
      this.getUbigeosProv(response.data.departamento_id);
      this.getUbigeosDist(response.data.provincia_id);
      // @ts-ignore
      this.academiCyclePatchValue(this.student);
    });
  }

  public academiCyclePatchValue(student: Student): void {
    student.fe_nacimiento = this.patchDateObject(student.fe_nacimiento);
    // @ts-ignore
    this.studentForm.patchValue(student);
  }

  public saveForm(): void {
    if (this.studentForm.valid) {
      // @ts-ignore
      this.studentForm.value.fe_nacimiento = `${this.studentForm.value.fe_nacimiento.year}-${this.addZero(this.studentForm.value.fe_nacimiento.month)}-${this.addZero(this.studentForm.value.fe_nacimiento.day)}`;
      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.studentService.update$(this.idStudent,this.studentForm.value).subscribe(response => {
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
