import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import {Staff} from "../../models/staff";


@Component({
  selector: 'app-staff-list',
  template: `
      <div class="responsive-table">
          <table class="table table-lg table-hover table-striped table-sm">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRES</th>
                  <th scope="col">APELLIDOS</th>
                  <th scope="col">DNI</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">CELULAR</th>
                  <th scope="col">SEXO</th>
                  <th scope="col">NACIMIENTO</th>
                  <th scope="col">DEPART.</th>
                  <th scope="col">PROVINCIA</th>
                  <th scope="col">DISTRITO</th>
                  <th scope="col">GRADO INSTRUCCIÓN</th>
                  <th scope="col">Acciones</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
              <tr *ngFor="let v of staffs ; let i=index">
                  <th scope="row">{{i + 1}}</th>
                  <td data-title="Nombres">{{v.nombres}}</td>
                  <td data-title="Apellidos">{{v.apellido_pa}} {{v.apellido_ma}}</td>
                  <td data-title="DNI">{{v.dni}}</td>
                  <td data-title="Correo">{{v.correo_electronico}}</td>
                  <td data-title="Celular">{{v.celular}}</td>
                  <td data-title="Sexo">{{v.sexo}}</td>
                  <td data-title="Nacimiento">{{v.fe_nacimiento}}</td>
                  <td data-title="Departamento">{{v.departamento_id}}</td>
                  <td data-title="Provincia">{{v.provincia_id}}</td>
                  <td data-title="Distrito">{{v.distrito_id}}</td>
                  <td data-title="Grado">{{v.grado_instruccion_id}}</td>
                  <td data-title="Acciones">
                      <button type="button" class="btn-gm-sm btn btn-warning btn-gm-small"
                              title="{{ abcForms.btnEdit.label }}" (click)="goEdit(v.id!)">
                          <span class="{{ abcForms.btnEdit.icon }}"></span>
                      </button>
                      <button type="button" class="btn-gm-sm btn btn-danger text-white btn-gm-small"
                              title="{{ abcForms.btnDelete.label }}" (click)="goDelete(v.id!)">
                          <span class="{{ abcForms.btnDelete.icon }}"></span>
                      </button>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
  `,
})

export class StaffListComponent implements OnInit {
  abcForms: any;
  @Input() staffs: Staff[] = [];
  @Output() eventEdit = new EventEmitter<number>();

  @Output() eventDelete = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    this.abcForms = abcForms;
  }

  public goEdit(id: number): void {
    this.eventEdit.emit(id);
  }

  public goDelete(id: number): void {
    this.eventDelete.emit(id);
  }
}
