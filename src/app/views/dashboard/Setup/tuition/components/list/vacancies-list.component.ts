import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import { Tuition } from '../../models/tuition';


@Component({
  selector: 'app-vacancies-list',
  template: `
    <div class="responsive-table">
      <table class="table table-lg table-hover table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ciclo</th>
          <th scope="col">Especialidad</th>
          <th scope="col">Módulo</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr *ngFor="let o of tuitions ; let i=index">
          <th scope="row">{{i + 1}}</th>
          <td data-title="ciclo">{{o.ciclo_academico_id}}</td>
          <td data-title="especialidad">{{o.especialidad_id}}</td>
          <td data-title="modulo">{{o.modulo_id}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
})

export class VacanciesListComponent implements OnInit {
  abcForms: any;
  @Input() tuitions: Tuition[] = [];
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
