import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import {User} from '../../models/user';


@Component({
  selector: 'app-user-list',
  template: `
    <div class="d-flex justify-content-end">
      <button type="button" (click)="goNew()" class="btn-gm-danger">
        <span class="{{ abcForms.btnNew.icon }} lamb-icon"></span> {{ abcForms.btnNew.label }} Usuario
      </button>
    </div>
    <div>
      <div class="row mt-3">
        <c-col xs="12" md="6" sm="6" lg="6" xl="4" *ngFor="let us of users; let i= index" class="mb-2">
          <c-card class="shadow-gm-card">
            <c-card-body>
              <div class="row">
                <c-col md="3"
                       class="d-flex align-items-center justify-content-center bg-primary bg-{{us.active}}">
                  <span>{{i + 1}}</span>
                  <i class="fa fa-user"></i>
                </c-col>
                <c-col md="9" class="mt-3">
                  <h5 cCardTitle></h5>
                  <p cCardText class="m-0">
                    <b>Usuario:</b>
                    {{us.name}}
                  </p>
                  <p cCardText class="m-0">
                    <b>Email:</b>
                    {{us.email}}
                  </p>
                  <p cCardText class="m-0">
                    <b>Fecha Registro:</b>
                    {{us.created_at}}
                  </p>
                  <p cCardText class="m-0">
                    <b>Estado:</b>
                    {{us.active}}
                  </p>
                  <div class="d-flex align-items-center justify-content-end">
                    <button type="button" class="btn-gm-sm btn {{ abcForms.btnEdit.class }}"
                            title="{{ abcForms.btnEdit.label }}" (click)="goAssign(us.id!)">
                      <span class="{{ abcForms.btnNew.icon }} lamb-icon"></span> Rol
                    </button>
                    <button type="button" class="btn-gm-sm btn {{ abcForms.btnDelete.class }} "
                            title="{{ abcForms.btnDelete.label }}" (click)="goChangeState(us.id!)">
                      <span class="{{ abcForms.btnRepeat.icon }} lamb-icon"></span> Cambiar
                    </button>
                  </div>
                </c-col>
              </div>
            </c-card-body>
          </c-card>
        </c-col>
      </div>
    </div>`,
})

export class UserListComponent implements OnInit {
  abcForms: any;
  @Input() users: User[] = [];
  @Output() eventNew = new EventEmitter<boolean>();
  @Output() eventEdit = new EventEmitter<number>();
  @Output() eventAssign = new EventEmitter<number>();
  @Output() eventChangeState = new EventEmitter<number>();

  constructor() {
  }


  ngOnInit() {
    this.abcForms = abcForms;
  }

  public goNew() {
    this.eventNew.emit(true);
  }

  public goChangeState(id: number) {
    this.eventChangeState.emit(id);
  }


  public goAssign(id: number) {
    this.eventAssign.emit(id);
  }
}
