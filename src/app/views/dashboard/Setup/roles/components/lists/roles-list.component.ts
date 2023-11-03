import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {abcForms} from 'src/environments/generals';
import {Rol} from '../../models/Rol';

@Component({
  selector: 'app-roles-list',

  template: `
  <div class="d-flex justify-content-end">
    <button type="button" (click)="goNew()" class="btn-gm-danger">
      <span class="{{ abcForms.btnNew.icon }} lamb-icon"></span> {{ abcForms.btnNew.label }} Rol
    </button>
  </div>
        <div class="row mt-3">
          <c-col md="6" xs="12" sm="4" lg="4" xl="3" *ngFor="let r of rols; let i= index" class="mb-2">
              <c-card class="shadow-gm-card">
                  <c-card-body>
                  <div class="row">
                      <c-col md="3" class="d-flex align-items-center justify-content-center bg-primary img-gm-svg">
                          <span>{{i+1}}</span>
                           <i class="{{abcForms.btnUser.icon}}"></i>
                      </c-col>
                      <c-col md="9">

                              <h5 cCardTitle></h5>
                              <p cCardText class="m-0 mb-1">
                                  <b>Rol:</b>
                                  {{r.nombre}}
                              </p>
                              <button type="button" class="btn-gm-sm btn {{ abcForms.btnEdit.class }} "
                                  title="{{ abcForms.btnEdit.label }}" (click)="goEdit(r.id!)">
                                  <span class="{{ abcForms.btnEdit.icon }} lamb-icon"></span>
                              </button>
                              <button type="button" class="btn-gm-sm btn {{ abcForms.btnDelete.class }} "
                                  title="{{ abcForms.btnDelete.label }}" (click)="goDelete(r.id!)">
                                  <span class="{{ abcForms.btnDelete.icon }} lamb-icon"></span>
                              </button>
                              <button type="button" class="btn-gm-sm btn {{ abcForms.btnExchange.class }} "
                                  title="{{ abcForms.btnExchange.label }}" (click)="goAssign(r.id!)">
                                  <span class="{{ abcForms.btnExchange.icon }} lamb-icon"></span>
                              </button>

                      </c-col>
                  </div>
              </c-card-body>

              </c-card>
          </c-col>
      </div>
  `,
})

export class RolesListComponent implements OnInit {
  abcForms: any;
  @Input() rols: Rol[] = [];
  @Output() eventNew = new EventEmitter<boolean>();
  @Output() eventEdit = new EventEmitter<number>();
  @Output() eventDelete = new EventEmitter<number>();
  @Output() eventAssign = new EventEmitter<number>();

  constructor() {
  }


  ngOnInit() {
    this.abcForms = abcForms;
  }

  public goNew(): void {
    this.eventNew.emit(true);
  }

  public goEdit(id: number): void {
    this.eventEdit.emit(id);
  }

  public goDelete(id: number): void {
    this.eventDelete.emit(id);
  }

  public goAssign(id: number): void {
    this.eventAssign.emit(id);
  }
}
