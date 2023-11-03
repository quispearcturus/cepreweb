import { Component, OnInit } from '@angular/core';
import {abcForms} from "../../../../../environments/generals";
@Component({
  template: `
    <div class="card shadow-gm-card m-1">
      <h1 class="fa-3x icon-gm-float"><i class="{{abcForms.btnUser.icon}}"></i></h1>
        <div class="card-body">
            <router-outlet></router-outlet>
        </div>
    </div>
  `,
})
export class UsersComponent implements OnInit {
  abcForms:any;
  public title: string='';
  constructor() { }

  ngOnInit() {
    this.title = 'Usuarios';
    this.abcForms = abcForms;
  }

}
