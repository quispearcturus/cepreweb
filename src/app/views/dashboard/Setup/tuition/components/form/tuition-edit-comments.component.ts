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
    <div class="modal-body">
      <form [formGroup]="tuitionForm">
        <div class="form-group row required">
          <div class="col-sm-9 input-group input-group-sm input-group-rounded">
            <textarea type="text" class="form-control form-control-sm" formControlName="observacion"
                   id="observacion"
                      placeholder="Observación" required></textarea>
          </div>
          <app-form-validate-errors [group]="tuitionForm"
                                    [controlName]="'observacion'"></app-form-validate-errors>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
        <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
      </button>
      <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
              [disabled]="tuitionForm.invalid">
        <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
      </button>
    </div>
  `
})
export class TuitionEditCommentsComponent implements OnInit {
  abcForms: any;
  @Input() title: string = '';
  @Input() tuition = new Tuition();

  tuitionForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    observacion: new FormControl('',[Validators.required]),
  });


  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    if (this.tuition) {
      this.tuitionForm.patchValue({
        id: this.tuition.id,
        observacion: this.tuition.observacion,
      });
    }
  }
  public saveForm(): void {
    if (this.tuitionForm.valid) {
      this.activeModal.close(this.tuitionForm.value);
    }
  }
  public cancelForm(): void {
    this.activeModal.close('');
    //this.router.navigate(['../'], {relativeTo: this.route});
  }
}
