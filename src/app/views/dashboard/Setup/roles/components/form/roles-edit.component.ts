import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {abcForms} from 'src/environments/generals';
import {Rol} from '../../models/Rol';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-roles-edit',
  template: `
    <div class="modal-header">
      <h6 class="modal-title">{{title}}</h6>
      <button type="button" class="close" aria-label="Close" (click)="cancelForm()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="rolesForm">
        <div class="form-group row required">
          <div class="input-group input-group-sm col-sm-3">
            <label class="col-form-label">Rol.</label>
          </div>
          <div class="col-sm-9 input-group input-group-sm input-group-rounded">
            <input type="text" class="form-control form-control-sm" formControlName="nombre"
                   id="nombre"
                   placeholder="Rol">
          </div>
          <app-form-validate-errors [group]="rolesForm"
                                    [controlName]="'nombre'"></app-form-validate-errors>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
        <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
      </button>
      <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
              [disabled]="rolesForm.invalid">
        <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
      </button>
    </div>
  `
})
export class RolesEditComponent implements OnInit {
  rolesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
  @Input() title: string = '';
  @Input() rol = new Rol();
  abcForms: any;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.abcForms = abcForms;

    if (this.rol) {
      this.rolesForm.patchValue({
        nombre: this.rol.nombre,

      });
    }
  }

  public saveForm(): void {
    if (this.rolesForm.valid) {
      this.activeModal.close(this.rolesForm.value);
    }
  }

  public cancelForm(): void {
    this.activeModal.close('');
  }
}
