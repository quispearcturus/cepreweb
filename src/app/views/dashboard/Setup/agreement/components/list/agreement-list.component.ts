import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { abcForms } from 'src/environments/generals';
import { Agreement } from "../../models/agreement";


@Component({
  selector: 'app-agreement-list',
  template: `
      <div class="responsive-table">
          <table class="table table-lg table-hover table-striped table-sm">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Institución</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Correo</th>
                  <!-- <th scope="col">DEPART.</th>
                  <th scope="col">PROVINCIA</th>
                  <th scope="col">DISTRITO</th> -->
                  <th scope="col">ACCIONES</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
              <tr *ngFor="let k of agreements ; let i=index">
                  <th scope="row">{{i + 1}}</th>
                  <td data-title="Nombre">{{k.nombre}}</td>
                  <td data-title="Direccion">{{k.direccion}}</td>
                  <td data-title="Celular">{{k.celular}}</td>
                  <td data-title="Correo">{{k.correo}}</td>
                  <!-- <td data-title="Departamento">{{k.departamento_id}}</td>
                  <td data-title="Provincia">{{k.provincia_id}}</td>
                  <td data-title="Distrito">{{k.distrito_id}}</td> -->
                  <td data-title="Acciones">
                      <button type="button" class="btn-gm-sm btn btn-warning btn-gm-small"
                              title="{{ abcForms.btnEdit.label }}" (click)="goEdit(k.id!)">
                          <span class="{{ abcForms.btnEdit.icon }}"></span>
                      </button>
                      <button type="button" class="btn-gm-sm btn btn-danger text-white btn-gm-small"
                              title="{{ abcForms.btnDelete.label }}" (click)="goDelete(k.id!)">
                          <span class="{{ abcForms.btnDelete.icon }}"></span>
                      </button>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
  `,
})

export class AgreementListComponent implements OnInit {
  abcForms: any;
  @Input() agreements: Agreement[] = [];
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
