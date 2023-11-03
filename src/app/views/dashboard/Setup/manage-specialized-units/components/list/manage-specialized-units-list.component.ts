import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManageModule } from "../../../manage-module/models/manage-module";
import { abcForms } from '../../../../../../../environments/generals';

@Component({
  selector: 'app-manage-specialized-units-list',
  template: `
      <div class="responsive-table">
          <table class="table table-lg table-hover table-striped table-sm">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ciclo</th>
                  <th scope="col">Especialidad</th>
                  <th scope="col">Módulo</th>
                  <th scope="col">Programa</th>
                  <th scope="col">Turno y hora</th>
                  <th scope="col">Docente</th>
                  <th scope="col">Laboratio</th>
                  <th scope="col">Vacantes</th>
                  <th scope="col">Sección</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
              <tr *ngFor="let v of manageModules ; let i=index">
              <th scope="row">{{i + 1}}</th>
                  <td data-title="ciclo">{{v.ciclo}}</td>
                  <td data-title="especialidad">{{v.especialidad}}</td>
                  <td data-title="modulo">{{v.modulo}}</td>
                  <td data-title="Programa">{{v.programa}}</td>
                  <td data-title="Turno">{{v.turno_hora}}</td>
                  <td data-title="Docente">{{v.docente}}</td>
                  <td data-title="Laboratorio">{{v.laboratorio}}</td>
                  <td data-title="Vacante">{{v.vacantes}}</td>
                  <td data-title="Seccion">{{v.seccion}}</td>
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
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
  `,
})

export class ManageSpecializedUnitsListComponent implements OnInit {
  abcForms: any;
  @Input() manageModules: ManageModule[] = [];
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
