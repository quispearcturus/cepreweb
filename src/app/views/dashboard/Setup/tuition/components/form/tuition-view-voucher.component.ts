import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms, section, turne} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {AcademicModuleService} from "../../../../../../providers/services/setup/academic-module.service";
import {
  CicleService,
  ManageModuleService,
  SpecialtyService, TuitionService
} from "../../../../../../providers/services";
import {Cicle} from "../../../cicle/models/cicle";
import {Specialty} from "../../../specialities/models/specialty";
import { ManageModule } from '../../../manage-module/models/manage-module';
import { Student } from '../../../students/models/student';
import { AcademicModule } from '../../../academic-module/models/academic-module';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Tuition} from "../../models/tuition";

@Component({
  selector: 'app-tuition-edit-comments',
  template: `
    <div class="modal-header">
      <h6 class="modal-title">{{title}}</h6>
      <button type="button" class="close" aria-label="Close" (click)="cancelForm()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" >
      <img src="{{img}}" alt="" width="400">
    </div>
    <div class="modal-body" [hidden]="img">
      <p>Sin Imagen</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
        <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
      </button>
    </div>
  `
})
export class TuitionViewVoucherComponent implements OnInit {
  abcForms: any;
  @Input() title: string = '';
  @Input() img: string = '';


  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
  }
  public cancelForm(): void {
    this.activeModal.close('');
  }
}
