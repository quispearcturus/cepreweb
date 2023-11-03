import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {abcForms, typesReceta} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {StaffService} from "../../../../../../providers/services/setup/staff.service";
import {AcademicModuleService} from "../../../../../../providers/services/setup/academic-module.service";
import {Prov} from "../../../staffs/models/ubigeo";
import {LevelCicle} from "../../models/level-cicle";
import {Specialty} from "../../models/specialty";
import {TypeProgram} from "../../models/type-program";
import {CycleLevelService, SpecialtyService} from "../../../../../../providers/services";

@Component({
  selector: 'app-staff-new',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
      <form [formGroup]=moduleForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Módulo</legend>
          <div class="row pb-2">
            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b> NOMBRE. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="nombre"
                       id="nombre"
                       placeholder="Nombre">
              </div>
              <app-form-validate-errors [group]=moduleForm
                                        [controlName]="'nombre'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>CRÉDITOS. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="number" class="form-control form-control-sm" formControlName="credito"
                       id="credito"
                       placeholder="Créditos">
              </div>
              <app-form-validate-errors [group]=moduleForm
                                        [controlName]="'credito'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>CANT. HORAS. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="number" class="form-control form-control-sm" formControlName="cantidad_horas"
                       id="cantidad_horas"
                       placeholder="Cantidad">
              </div>
              <app-form-validate-errors [group]=moduleForm
                                        [controlName]="'cantidad_horas'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Nivel Ciclo. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="nivel_ciclo_id"
                        id="nivel_ciclo_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of levelCicles" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Especialidad. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="especialidad_id"
                        id="especialidad_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of specialties" [value]="l.id">
                    {{l.nombre}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Tipo Programa. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="tipo_programa_id"
                        id="tipo_programa_id">
                  <option value=''>Selecciona</option>
                  <option *ngFor="let l of typePrograms" [value]="l.id">
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
                [disabled]="moduleForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class AcademicModuleNewComponent implements OnInit {
  //@Input() title: string = '';
  abcForms: any;
  public error: string = '';
  public levelCicles: LevelCicle[] = [];
  public specialties: Specialty[] = [];
  public typePrograms: TypeProgram[] = [];

  moduleForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    credito: new FormControl(0, [Validators.required]),
    cantidad_horas: new FormControl(0, [Validators.required]),
    nivel_ciclo_id: new FormControl('', [Validators.required]),
    especialidad_id: new FormControl('', [Validators.required]),
    tipo_programa_id: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
  });


  constructor(
              private academicModuleService: AcademicModuleService,
              private cycleLevelService: CycleLevelService,
              private specialtyService: SpecialtyService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.getLevelCicles();
    this.getSpecialties();
    this.getTypeProgram();
  }

  public getLevelCicles(): void {
    this.cycleLevelService.getAll$().subscribe(response => {
      this.levelCicles = response && response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getSpecialties(): void {
    this.specialtyService.getAll$().subscribe(response => {
      this.specialties = response && response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getTypeProgram(): void {
    this.academicModuleService.getTypeProgram$().subscribe(response => {
      this.typePrograms = response && response.data || [];
    }, error => {
      this.error = error;
    });
  }



  public saveForm(): void {
    if (this.moduleForm.valid) {
      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.academicModuleService.add$(this.moduleForm.value).subscribe(response => {
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
