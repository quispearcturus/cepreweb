import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import {AcademicModule} from "../../models/academic-module";


@Component({
  selector: 'app-staff-list',
  template: `
      <div class="responsive-table">
          <table class="table table-lg table-hover table-striped table-sm">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">ESPECIALIDAD</th>
                  <th scope="col">CRÉDITO</th>
                  <th scope="col">CANT. HORA</th>
                  <th scope="col">NIVEL</th>
                  <th scope="col">PROGRAMA</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col">Acciones</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
              <tr *ngFor="let v of academicModules ; let i=index">
                  <th scope="row">{{i + 1}}</th>
                  <td data-title="Nombres">{{v.nombre}}</td>
                  <td data-title="Especialidad">{{v.especialidad_id}}</td>
                  <td data-title="Crédito">{{v.credito}}</td>
                  <td data-title="Horas">{{v.cantidad_horas}}</td>
                  <td data-title="Nivel">{{v.nivel_ciclo_id}}</td>
                  <td data-title="Programa">{{v.tipo_programa_id}}</td>
                  <td data-title="Estado">
                      <span
                        class="badge text-bg-{{
                          v.estado ? 'success' : 'danger'
                        }} text-white"
                      >
                        {{ v.estado ? 'Activo' : 'Inactivo' }}
                      </span>
                  </td>
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

export class AcademicModuleListComponent implements OnInit {
  abcForms: any;
  @Input() academicModules: AcademicModule[] = [];
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
