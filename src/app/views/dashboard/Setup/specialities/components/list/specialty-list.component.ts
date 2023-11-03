import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import {Specialty} from "../../models/specialty";


@Component({
  selector: 'app-specialty-list',
  template: `
      <div class="responsive-table">
          <table class="table table-lg table-hover table-striped table-sm">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Especialidad</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Crédito</th>
                  <th scope="col">Cantidad Hora</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
              <tr *ngFor="let v of specialties ; let i=index">
                  <th scope="row">{{i + 1}}</th>
                  <td data-title="Especialidad">{{v.nombre}}</td>
                  <td data-title="Descripción">{{v.descripcion}}</td>
                  <td data-title="Crédito">{{v.creditos}}</td>
                  <td data-title="Cantidad Hora">{{v.cantidad_horas}}</td>
                  <td data-title="Estado">
                        <span class="badge text-bg-{{v.estado?'success': 'danger'}} text-white">
                            {{v.estado ? 'Activo' : 'Inactivo'}}
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

export class SpecialtyListComponent implements OnInit {
  abcForms: any;
  @Input() specialties: Specialty[] = [];
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
