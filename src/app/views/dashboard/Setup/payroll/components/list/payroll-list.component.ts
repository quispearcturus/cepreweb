import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManageModule } from "../../../manage-module/models/manage-module";
import { abcForms } from '../../../../../../../environments/generals';

@Component({
  selector: 'app-payroll-list',
  template: `
      <div class="responsive-table">
          <table class="table table-lg table-hover table-striped table-sm">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Módulos</th>
                  <th scope="col">Turno y hora</th>
                  <th scope="col">Imprimir</th>
              </tr>
              </thead>
              <tbody class="table-group-divider">
              <tr *ngFor="let v of manageModules ; let i=index">
              <th scope="row">{{i + 1}}</th>
                  <td data-title="modulo">{{v.modulo}}</td>
                  <td data-title="Turno">{{v.turno_hora}}</td>
                  <td data-title="Imprimir">
                      <button type="button" class="btn-gm-lg btn btn-gm-small"
                              title="{{ abcForms.btnPrint.label }}">
                          <span class="{{ abcForms.btnPrint.icon }} text-info"></span>
                      </button>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
  `,
})

export class PayrollListComponent implements OnInit {
  abcForms: any;
  @Input() manageModules: ManageModule[] = [];

  constructor() {

  }

  ngOnInit() {
    this.abcForms = abcForms;
  }

}
