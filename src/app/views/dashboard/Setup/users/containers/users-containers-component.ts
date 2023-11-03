import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user';
import { UserNewComponent } from '../components/form/user-new.component';
import { UserRolesComponent } from '../components/form/user-roles.component';
import { SignupService } from 'src/app/providers/services/oauth';
import { UsersService } from '../../../../../providers/services';
import { ConfirmDialogService } from '../../../../../shared';

@Component({
  selector: 'app-users-container',
  template: `
    <app-user-list
      [users]="users"
      (eventNew)="eventNew($event)"
      (eventAssign)="eventAssign($event)"
      (eventChangeState)="eventChangeState($event)"
    ></app-user-list>
  `,
})
export class UsersContainerComponent implements OnInit {
  public error: string = '';
  public users: User[] = [];
  public user = new User();

  constructor(
    private userService: UsersService,
    private signupService: SignupService,
    private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll$().subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  public eventNew($event: boolean): void {
    if ($event) {
      const userForm = this.modalService.open(UserNewComponent);
      userForm.componentInstance.title = 'Nuevo Usuario' || null;
      userForm.result.then((result) => {
        if (result) {
          this.saveUser(result);
        }
      });
    }
  }

  saveUser(data: Object) {
    this.signupService.add$(data).subscribe((response) => {
      this.users = (response && response.data) || [];
      this.getUsers();
    });
  }

  eventAssign($event: number) {
    let userForm = this.modalService.open(UserRolesComponent, { size: 'lg' });
    userForm.componentInstance.title = 'Asignar Rol a Usuario' || null;
    userForm.componentInstance.idUser = $event;
    userForm.result.then((result) => {
      if (result) {
        // this.saveUser(result);
      }
    });
  }

  public eventChangeState($event: number): void {
    this.userService.getById$($event).subscribe((response) => {
      this.users = response.data;
    });
  }
}
