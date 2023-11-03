import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { abcForms, typesReceta } from 'src/environments/generals';

import { LaboratoryService } from '../../../../../../providers/services';
import { ConfirmDialogService } from '../../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from '../../models/laboratory';

@Component({
  selector: 'app-laboratory-new',
  template: `
    <button
      type="button"
      class="close btn-gm-return mb-2"
      aria-label="Close"
      (click)="cancelForm()"
    >
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>

    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active"
            ><i class="{{ abcForms.btnNew.icon }}"></i> Nuevo Laboratorio</a
          >
        </li>
      </ul>
      <form
        [formGroup]="laboratoryForm"
        class="row mt-2 d-flex justify-content-start align-items-center "
      >
        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"
              ><b>Laboratorio </b><span class="text-danger">(*)</span></label
            >
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input
              type="text"
              class="form-control form-control-sm"
              formControlName="nombre"
              id="nombre"
              placeholder="Nombre del laboratorio"
            />
          </div>
          <app-form-validate-errors
            [group]="laboratoryForm"
            [controlName]="'nombre'"
          ></app-form-validate-errors>
        </div>

        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"
              ><b>Descripción </b><span class="text-danger">(*)</span></label
            >
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input
              type="text"
              class="form-control form-control-sm"
              formControlName="descripcion"
              id="descripcion"
              placeholder="Descripcion"
            />
          </div>
          <app-form-validate-errors
            [group]="laboratoryForm"
            [controlName]="'descripcion'"
          ></app-form-validate-errors>
        </div>

        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"
              ><b>Aforo del Laboratorio </b
              ><span class="text-danger">(*)</span></label
            >
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input
              type="text"
              class="form-control form-control-sm"
              formControlName="capacidad_laboratorio"
              id="capacidad_laboratorio"
              placeholder="Ingrese el aforo"
            />
          </div>
          <app-form-validate-errors
            [group]="laboratoryForm"
            [controlName]="'capacidad_laboratorio'"
          ></app-form-validate-errors>
        </div>

        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"
              ><b>Cantidad de Maquinas </b
              ><span class="text-danger">(*)</span></label
            >
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input
              type="text"
              class="form-control form-control-sm"
              formControlName="cantidad_maquinas"
              id="cantidad_maquinas"
              placeholder="Ingrese la cantidad"
            />
          </div>
          <app-form-validate-errors
            [group]="laboratoryForm"
            [controlName]="'cantidad_maquinas'"
          ></app-form-validate-errors>
        </div>

        <div class="form-group col-md-2">
          <div class="input-group input-group-sm input-group-rounded">
            <div class="input-group input-group-sm">
              <label class="col-form-label"><b>Estado</b></label>
            </div>
            <div
              class="custom-control custom-checkbox d-flex align-items-center"
            >
              <input
                type="checkbox"
                class="custom-control-input"
                id="estado"
                formControlName="estado"
              />
              <label
                class="custom-control-label todo-label badge-gm"
                for="estado"
              >
                <span
                  class="badge text-bg-{laboratoryForm.value.estado ?'success': 'danger'}} text-white"
                  >{{
                    this.laboratoryForm.value.estado ? 'ACTIVO' : 'INACTIVO'
                  }}</span
                >
              </label>
            </div>
          </div>
        </div>
      </form>
      <hr />
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button
          type="button"
          class="btn {{ abcForms.btnCancel.class }} btn-sm"
          (click)="cancelForm()"
        >
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span>
          {{ abcForms.btnCancel.label }}
        </button>
        <button
          type="button"
          class="btn {{ abcForms.btnSave.class }} btn-sm"
          (click)="saveForm()"
          [disabled]="laboratoryForm.invalid"
        >
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span>
          {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `,
})
export class LaboratoryNewComponent implements OnInit {
  //@Input() title: string = '';
  abcForms: any;
  public error: string = '';

  laboratoryForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    capacidad_laboratorio: new FormControl('', [Validators.required]),
    cantidad_maquinas: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
  });

  constructor(
    private laboratoryService: LaboratoryService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.abcForms = abcForms;
  }

  public saveForm(): void {
    console.log(this.laboratoryForm.value);
    if (this.laboratoryForm.valid) {
      // @ts-ignore
      this.confirmDialogService
        .confirmSave()
        .then(() => {
          this.laboratoryService.add$(this.laboratoryForm.value).subscribe(
            (response) => {
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            (error) => {
              this.error = error;
            }
          );
        })
        .catch(() => {});
    }
  }

  public cancelForm(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
