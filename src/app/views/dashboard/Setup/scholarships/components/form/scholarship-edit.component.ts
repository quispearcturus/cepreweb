import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { abcForms } from 'src/environments/generals';
import { ScholarshipService } from '../../../../../../providers/services';
import { ConfirmDialogService } from '../../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Scholarship } from '../../models/scholarship';

@Component({
  selector: 'app-scholarship-edit',
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
            ><i class="{{ abcForms.btnNew.icon }}"></i> Nueva Beca</a
          >
        </li>
      </ul>
      <form
        [formGroup]="scholarshipForm"
        class="row mt-2 d-flex justify-content-start align-items-center "
      >
        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"
              ><b>Beca </b><span class="text-danger">(*)</span></label
            >
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input
              type="text"
              class="form-control form-control-sm"
              formControlName="nombre"
              id="nombre"
              placeholder="Beca"
            />
          </div>
          <app-form-validate-errors
            [group]="scholarshipForm"
            [controlName]="'nombre'"
          ></app-form-validate-errors>
        </div>
        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"
              ><b>Monto </b><span class="text-danger">(*)</span></label
            >
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input
              type="text"
              class="form-control form-control-sm"
              formControlName="monto"
              id="monto"
              placeholder="monto"
            />
          </div>
          <app-form-validate-errors
            [group]="scholarshipForm"
            [controlName]="'monto'"
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
                  class="badge text-bg-{scholarshipForm.value.estado ?'success': 'danger'}} text-white"
                  >{{
                    this.scholarshipForm.value.estado ? 'ACTIVO' : 'INACTIVO'
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
          [disabled]="scholarshipForm.invalid"
        >
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span>
          {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `,
})
export class ScholarshipEditComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public idScholarship: number = 0;
  public scholarship = new Scholarship();
  scholarshipForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
  });

  constructor(
    private scholarshipService: ScholarshipService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.abcForms = abcForms;
    this.route.params.subscribe((res) => {
      this.idScholarship = parseInt(res['idScholarship']);
      this.scholarshipGetById(this.idScholarship);
    });
  }

  scholarshipGetById(idScholarship: number): void {
    this.scholarshipService.getById$(idScholarship).subscribe((resopnse) => {
      this.scholarship = resopnse.data;
      // @ts-ignore
      this.scholarshipForm.patchValue(this.scholarship);
    });
  }

  public saveForm(): void {
    if (this.scholarshipForm.valid) {
      // @ts-ignore
      this.confirmDialogService
        .confirmUpdate()
        .then(() => {
          this.scholarshipService
            .update$(this.idScholarship, this.scholarshipForm.value)
            .subscribe(
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
