import { Component, OnInit } from '@angular/core';
import { abcForms } from "../../../../../environments/generals";

@Component({
  template: `
    <div class="card shadow-gm-card m-1">
        <div class="card-body">
            <h1 class="fa-3x icon-gm-float"><i class="{{abcForm.btnUser.icon}}"></i></h1>
            <router-outlet></router-outlet>
        </div>
    </div>
  `,
})
export class AgreementComponent implements OnInit {

  public title: string='';
  abcForm:any;
  constructor() { }

  ngOnInit() {
    this.title = 'Institución Convenio';
    this.abcForm = abcForms;
  }

}
