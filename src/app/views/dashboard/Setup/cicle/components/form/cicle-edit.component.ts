import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms, periodoCiclo} from 'src/environments/generals';
import {CicleService} from "../../../../../../providers/services";
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {Cicle} from "../../models/cicle";

@Component({
  selector: 'app-cicle-edit',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>

    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active"><i class="{{ abcForms.btnNew.icon }}"></i> Edición de Ciclo</a>
        </li>
      </ul>
      <form [formGroup]=cicleForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <div class="form-group col-md-1"></div>
        <div class="form-group col-md-4 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"><b> AÑO </b><span class="text-danger">(*)</span></label>
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input type="number" class="form-control form-control-sm" formControlName="anio"
                   id="anio"
                   placeholder="AÑO">
          </div>
          <app-form-validate-errors [group]=cicleForm
                                    [controlName]="'anio'"></app-form-validate-errors>
        </div>
        <div class="form-group col-md-4 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Periodo. </b><span class="text-danger">(*)</span> </label>
            <select class="form-control form-select form-control-sm" formControlName="periodo"
                    id="periodo">
              <option value="">Selecciona</option>
              <option *ngFor="let l of periodoCiclo" [value]="l.nombre">
                {{l.nombre}}
              </option>
            </select>
          </div>
          <app-form-validate-errors [group]="cicleForm"
                                    [controlName]="'periodo'"></app-form-validate-errors>
        </div>
        <div class="form-group col-md-2">
          <div class="input-group input-group-sm input-group-rounded">
            <div class="input-group input-group-sm">
              <label class="col-form-label"><b>Estado.</b></label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center">
              <input type="checkbox" class="custom-control-input" id="estado"
                     formControlName="estado">
                     <label class="custom-control-label todo-label badge-gm" for="estado">
                <span
                  class="badge text-bg-{{this.cicleForm.value.estado ?'success': 'danger'}} text-white">{{this.cicleForm.value.estado ? 'ACTIVO' : 'INACTIVO'}}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group col-md-1"></div>

        <div class="form-group col-md-1"></div>
        <div class="form-group col-md-4 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"><b>Fecha Inicio. </b><span class="text-danger">(*)</span></label>
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input type="text" placeholder="Fecha (2023-01-26)"
                    class="form-control form-control-sm"
                    formControlName="fe_inicio_ciclo" ngbDatepicker #c="ngbDatepicker">
            <div class="input-group-append">
              <button class="btn btn-xs btn-primary text-white" type="button"
                      (click)="c.toggle()">
                <i class="fa fa-calendar"></i>
              </button>
            </div>
            <app-form-validate-errors [group]="cicleForm"
                                      [controlName]="'fe_inicio_ciclo'"></app-form-validate-errors>
          </div>
        </div>
        <div class="form-group col-md-4 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"><b>Fecha de culminación. </b><span class="text-danger">(*)</span></label>
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input type="text" placeholder="Fecha (2023-01-26)"
                    class="form-control form-control-sm"
                    formControlName="fe_fin_ciclo" ngbDatepicker #d="ngbDatepicker">
            <div class="input-group-append">
              <button class="btn btn-xs btn-primary text-white" type="button"
                      (click)="d.toggle()">
                <i class="fa fa-calendar"></i>
              </button>
            </div>
            <app-form-validate-errors [group]="cicleForm"
                                      [controlName]="'fe_fin_ciclo'"></app-form-validate-errors>
          </div>
        </div>
      </form>
      <hr>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
        </button>
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="cicleForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class CicleEditComponent implements OnInit {
  abcForms: any;
  periodoCiclo: any;
  public error: string = '';
  public idCicle: number = 0;
  public cicle = new Cicle();
  cicleForm = new FormGroup({
    anio: new FormControl('', [Validators.required]),
    periodo: new FormControl('', [Validators.required]),
    fe_inicio_ciclo: new FormControl('', [Validators.required]),
    fe_fin_ciclo: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
  });


  constructor(private cicleService: CicleService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.periodoCiclo = periodoCiclo;
    this.route.params.subscribe(res => {
      this.idCicle = parseInt(res['idCicle']);
      this.academiCycleGetById(this.idCicle);
    });


  }

  academiCycleGetById(idCicle: number): void {
    this.cicleService.getById$(idCicle).subscribe(response => {
      this.cicle = response.data;
      // @ts-ignore
      // this.cicleForm.patchValue(this.cicle);
      this.academiCyclePatchValue(this.cicle);
    });
  }

  public academiCyclePatchValue(cicle: Cicle): void {
    cicle.fe_inicio_ciclo = this.patchDateObject(cicle.fe_inicio_ciclo);
    cicle.fe_fin_ciclo = this.patchDateObject(cicle.fe_fin_ciclo);
    // @ts-ignore
    this.cicleForm.patchValue(cicle);
  }

  public saveForm(): void {
    if (this.cicleForm.valid) {
      // @ts-ignore
      this.cicleForm.value.fe_inicio_ciclo = `${this.cicleForm.value.fe_inicio_ciclo.year}-${this.addZero(this.cicleForm.value.fe_inicio_ciclo.month)}-${this.addZero(this.cicleForm.value.fe_inicio_ciclo.day)}`;

      // @ts-ignore
      this.cicleForm.value.fe_fin_ciclo = `${this.cicleForm.value.fe_fin_ciclo.year}-${this.addZero(this.cicleForm.value.fe_fin_ciclo.month)}-${this.addZero(this.cicleForm.value.fe_fin_ciclo.day)}`;

      // @ts-ignore
      this.confirmDialogService.confirmUpdate().then(() => {
        this.cicleService.update$(this.idCicle, this.cicleForm.value).subscribe(response => {
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

  private addZero(value: string): string {
    let dataValue: string;
    if (+value < 10) {
      dataValue = '0' + value.toString();
    } else {
      dataValue = value;
    }
    return dataValue;
  }



}
