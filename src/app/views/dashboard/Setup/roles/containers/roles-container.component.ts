import { Component, OnInit } from '@angular/core';

import { Rol } from '../models/Rol';

import { RolesNewComponent } from '../components/form/roles-new.component';
import { RolesEditComponent } from '../components/form/roles-edit.component';
import { RolesAssignComponent } from '../components';
import { RolService } from '../../../../../providers/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogService} from "../../../../../shared";

@Component({
  selector: 'app-roles-container',
  template: `
    <app-roles-list
      [rols]="rols"
      (eventNew)="eventNew($event)"
      (eventEdit)="eventEdit($event)"
      (eventAssign)="eventAssign($event)"
      (eventDelete)="eventDelete($event)"
    ></app-roles-list>
  `,
})
export class RolesContainerComponent implements OnInit {
  public error: string = '';
  public rols: Rol[] = [];
  public rol = new Rol();

  constructor(
    private rolService: RolService,
    private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService,
  )
  {}

  ngOnInit() {
    this.getRols();
  }

  getRols(): void {
    this.rolService.getAll$().subscribe(
      (response) => {
        this.rols = response.data.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  public eventNew($event: boolean): void {
    if ($event) {
      const rolForm = this.modalService.open(RolesNewComponent);
      rolForm.componentInstance.title = 'Nuevo Rol' || null;
      rolForm.result.then((result: any) => {
        if (result) {
          this.saveRol(result);
        }
      });
    }
  }

  saveRol(data: Object): void {
    this.rolService.add$(data).subscribe((response) => {
      this.rols = (response && response.data) || [];
    });
  }

  eventEdit(idRol: number): void {
    const listById = this.rolService
      .getById$(idRol)
      .subscribe(async (response) => {
        this.rol = (response && response.data) || {};
        await this.openMOdalEdit(this.rol);
        listById.unsubscribe();
      });
  }

  openMOdalEdit(data: Rol) {
    const rolForm = this.modalService.open(RolesEditComponent);
    rolForm.componentInstance.title = 'Editar Rol' || null;
    rolForm.componentInstance.rol = data;
    rolForm.result.then((result: any) => {
      if (result) {
        this.editRol(data.id!, result);
      }
    });
  }

  editRol(idRol: number, data: Object) {
    this.rolService.update$(idRol, data).subscribe((response) => {
      this.rols = (response && response.data) || [];
    });
  }

  eventAssign($event: number) {
    const rolForm = this.modalService.open(RolesAssignComponent, {
      size: 'lg',
    });
    rolForm.componentInstance.title = 'Asignar Acceso a Módulos' || null;
    rolForm.componentInstance.idRol = $event;
    rolForm.result.then((result: any) => {
      if (result) {
        // this.AsaRol(result);
      }
    });
  }

  public eventDelete(idRol: number) {
    this.confirmDialogService.confirmDelete().then(() => {
    this.rolService.delete$(idRol).subscribe((response) => {
      this.rols = (response && response.data) || [];
    });
    }).catch(() => {
    });
  }
}
