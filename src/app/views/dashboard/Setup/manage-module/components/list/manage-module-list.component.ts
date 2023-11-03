import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import {ManageModule} from "../../models/manage-module";


@Component({
  selector: 'app-staff-list',
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
          <th scope="col">Fecha inicio</th>
          <th scope="col">Fecha culminación</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr *ngFor="let o of manageModules ; let i=index">
          <th scope="row">{{i + 1}}</th>
          <td data-title="ciclo">{{o.ciclo}}</td>
          <td data-title="especialidad">{{o.especialidad}}</td>
          <td data-title="modulo">{{o.modulo}}</td>
          <td data-title="Programa">{{o.programa}}</td>
          <td data-title="Turno">{{o.turno_hora}}</td>
          <td data-title="Docente">{{o.docente}}</td>
          <td data-title="Laboratorio">{{o.laboratorio}}</td>
          <td data-title="Vacante">{{o.vacantes}}</td>
          <td data-title="Seccion">{{o.seccion}}</td>
          <td data-title="FechaI">{{o.fecha_inicio}}</td>
          <td data-title="FechaC">{{o.fecha_fin}}</td>
          <td data-title="Estado">
                        <span class="badge text-bg-{{o.estado?'success': 'danger'}} text-white">
                            {{o.estado ? 'Activo' : 'Inactivo'}}
                        </span>
          </td>
          <td data-title="Acciones">
            <button type="button" class="btn-gm-sm btn btn-warning btn-gm-small"
                    title="{{ abcForms.btnEdit.label }}" (click)="goEdit(o.id!)">
              <span class="{{ abcForms.btnEdit.icon }}"></span>
            </button>
            <button type="button" class="btn-gm-sm btn btn-danger text-white btn-gm-small"
                    title="{{ abcForms.btnDelete.label }}" (click)="goDelete(o.id!)">
              <span class="{{ abcForms.btnDelete.icon }}"></span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
})

export class ManageModuleListComponent implements OnInit {
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
