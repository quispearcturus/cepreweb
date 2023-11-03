import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { abcForms } from 'src/environments/generals';
import { Assistance } from '../../models/assistance';


@Component({
  selector: 'app-assistance-list',
  template: `
    <div class="responsive-table">
      <table class="table table-lg table-hover table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Apellidos y nombres</th>
          <th *ngFor="let o of assistances">{{ o.fecha }}</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr *ngFor="let o of assistances ; let i=index">
          <th scope="row">{{i + 1}}</th>
          <td data-title="nombres">{{o.apellido_pa}} {{o.apellido_ma}} {{o.nombres}}</td>
          <td data-title="nombres">{{o.estado}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
})

export class AssistanceListComponent implements OnInit {
  abcForms: any;
  @Input() assistances: Assistance[] = [];

  constructor() {
  }

  ngOnInit() {
    this.abcForms = abcForms;
  }

}
