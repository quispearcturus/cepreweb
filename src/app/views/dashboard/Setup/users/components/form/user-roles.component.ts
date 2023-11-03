import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {abcForms} from 'src/environments/generals';
import {RolService} from 'src/app/providers/services';
import {ConfirmDialogService} from 'src/app/shared';
import {RolAssigned} from '../../models/rolAssigned';

@Component({
  selector: 'app-user-roles-assign',
  template: `
    <div class="modal-header">
      <h6 class="modal-title">{{title}}</h6>
      <button type="button" class="close" aria-label="Close" (click)="cancelForm()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <div class="list-group">
            <a class="list-group-item" *ngFor="let m of roles; let i = index">
              <div class="custom-control custom-checkbox d-flex align-items-center">
                <input type="checkbox" class="custom-control-input" id="men{{i}}"
                       [(ngModel)]="m.asignado">
                <label class="custom-control-label todo-label badge-gm" for="men{{i}}">
                  <span class="badge badge-pill text-bg-{{ m.asignado ? 'success': 'danger' }} float-right text-white">
                      {{m.nombre}}
                  </span>
                </label>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
        <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
      </button>
      <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveAssign()">
        <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
      </button>
    </div>
  `
})
export class UserRolesComponent implements OnInit {
  @Input() title: string = '';
  @Input() idUser: number = 0;
  abcForms: any;
  roles: RolAssigned[] = [];
  rolesIds: number[] = [];

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private confirmDialogService: ConfirmDialogService,
              private rolService: RolService) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.getListRoles(this.idUser);
  }

  getListRoles(idUser: number) {
    const params: any = {};
    params.usuario_id = idUser;
    let r = this.rolService.getRolByUser$(params).subscribe(response => {
      this.roles = response && response.data || [];
      r.unsubscribe();
    });
  }

  public saveAssign(): void {
    this.roles.map(data => {
      if (data.asignado) {
        this.rolesIds.push(data.id!);
      }
    });
    this.confirmDialogService.confirmSave().then(() => {
      const params: any = {};
      params.usuario_id = this.idUser;
      params.roles = this.rolesIds;
      this.rolService.getRolUser$(params).subscribe(response => {
        this.activeModal.close('');
      });
    }).catch(() => {
    });
  }

  public cancelForm(): void {
    this.activeModal.close('');
  }

}
