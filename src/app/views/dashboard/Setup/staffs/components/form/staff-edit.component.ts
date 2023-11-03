import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms} from 'src/environments/generals';
import {CicleService} from "../../../../../../providers/services";
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {Staff} from "../../models/staff";
import {StudentService} from "../../../../../../providers/services/setup/student.service";
import {StatusCivil} from "../../models/status-civil";
import {StaffService} from "../../../../../../providers/services/setup/staff.service";
import {UbigeoService} from "../../../../../../providers/services/setup/ubigeo.service";
import {GradeInstructionService} from "../../../../../../providers/services/setup/grade-instruction.service";
import {Dep, Dist, Prov} from "../../models/ubigeo";
import {GradeInstruction} from "../../models/grade-instruction";

@Component({
  selector: 'app-staff-edit',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
      <form [formGroup]=staffForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Datos Personales</legend>
          <div class="row pb-2">
            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b> NOMBRES. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="nombres"
                       id="nombres"
                       placeholder="Nombres">
              </div>
              <app-form-validate-errors [group]=staffForm
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
              <app-form-validate-errors [group]=staffForm
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
              <app-form-validate-errors [group]=staffForm
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
              <app-form-validate-errors [group]=staffForm
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
              <app-form-validate-errors [group]=staffForm
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
              <app-form-validate-errors [group]=staffForm
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
                        id="id_estado_civil">
                  <option value="">Selecciona</option>
                  <option *ngFor="let l of statusCivils" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="staffForm"
                                        [controlName]="'id_estado_civil'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>FECHA NAC. <span
                  class="text-danger">(*)</span> </b> </label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="date" placeholder="Fecha (2020-01-26)"
                       class="form-control form-control-sm"
                       formControlName="fe_nacimiento">
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Datos de contacto</legend>
          <div class="row pb-2">
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Grado Instrucción. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="grado_instruccion_id"
                        id="grado_instruccion">
                  <option value=0>Selecciona Grado</option>
                  <option *ngFor="let l of gradeInstructions" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Departamento. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="departamento_id"
                        id="direccion_dep" (change)="getProvince($event)">
                  <option value="">Selecciona Departamento</option>
                  <option *ngFor="let l of Deps" [value]="l.cod_dep_sunat">
                    {{l.desc_dep_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="staffForm"
                                        [controlName]="'direccion_dep'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Provincia. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="provincia_id"
                        id="direccion_prov" (change)="getDistrite($event)">
                  <option value="">Selecciona Provincia</option>
                  <option *ngFor="let l of Provs" [value]="l.cod_prov_sunat">
                    {{l.desc_prov_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="staffForm"
                                        [controlName]="'direccion_prov'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto" >
                <label class="col-form-label"><b>Distrito. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="distrito_id"
                        id="direccion_dist">
                  <option value="">Selecciona Distrito</option>
                  <option *ngFor="let l of Dists" [value]="l.cod_ubigeo_sunat">
                    {{l.desc_ubigeo_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="staffForm"
                                        [controlName]="'distrito_id'"></app-form-validate-errors>
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
                [disabled]="staffForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class StaffEditComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public idStudent: number = 0;
  public student = new Staff();
  public statusCivils: StatusCivil[] = [];
  public Deps: Dep[] = [];
  public Provs: Prov[] = [];
  public Dists: Dist[] = [];
  public gradeInstructions: GradeInstruction[] = [];

  staffForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellido_pa: new FormControl('', [Validators.required]),
    apellido_ma: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    correo_electronico: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    sexo: new FormControl('M'),
    fe_nacimiento: new FormControl(''),
    estado_civil_id: new FormControl(1),
    departamento_id: new FormControl('', [Validators.required]),
    provincia_id: new FormControl('', [Validators.required]),
    distrito_id: new FormControl('', [Validators.required]),
    grado_instruccion_id: new FormControl(1, [Validators.required]),
  });


  constructor(private studentService: StudentService,
              private staffService: StaffService,
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
    this.studentService.getStatusCivil$().subscribe(response => {
      this.statusCivils = response && response.data || [];
    }, error => {
      this.error = error;
    });
  }

  GetById(idStudent: number): void {
    this.staffService.getById$(idStudent).subscribe(response => {
      this.student = response.data;
      this.getUbigeosProv(response.data.departamento_id);
      this.getUbigeosDist(response.data.provincia_id);
      // @ts-ignore
      this.academiCyclePatchValue(this.student);

    });
  }

  public academiCyclePatchValue(student: Staff): void {
    // @ts-ignore
    this.staffForm.patchValue(student);
  }

  public saveForm(): void {
    if (this.staffForm.valid) {

      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.staffService.update$(this.idStudent,this.staffForm.value).subscribe(response => {
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
      this.gradeInstructions = response.data || []
    });
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
}
