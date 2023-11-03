import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {abcForms, modality} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {AcademicModuleService} from "../../../../../../providers/services/setup/academic-module.service";
import {
  CicleService,
  ManageModuleService,
  SpecialtyService,
  TuitionService
} from "../../../../../../providers/services";
import {Cicle} from "../../../cicle/models/cicle";
import {Specialty} from "../../../specialities/models/specialty";
import { ManageModule } from '../../../manage-module/models/manage-module';
import { AcademicModule } from '../../../academic-module/models/academic-module';
import {Modality} from "../../models/modality";
import {Tuition} from "../../models/tuition";
import { StudentService } from 'src/app/providers/services/setup/student.service';
import { Student } from '../../../students/models/student';

@Component({
  selector: 'app-tuition-new',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Registro de Matrículas</legend>
          <form [formGroup]=searchstudentForm class="row mt-2 d-flex justify-content-start align-items-center ">
            <div class="row pb-2 mx-2">
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>DNI: </b><span class="text-danger">(*)</span></label>
                </div>
                <div class="input-group input-group-sm input-group-rounded">
                  <input type="number" class="form-control form-control-sm" formControlName="dni"
                         placeholder="01020203" (change)="onInputChange()">
                </div>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>Estudiante: </b><span class="text-danger">(*)</span></label>
                </div>
                <div class="input-group input-group-sm input-group-rounded">
                  <input type="text" class="form-control form-control-sm" formControlName="nombresAll"
                         id="nombresAll"
                         placeholder="Estudiante">
                </div>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Ciclo Academico. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="ciclo_academico_id"
                          id="ciclo_academico_id">
                    <option value=0>Selecciona</option>
                    <option *ngFor="let l of cicles" [value]="l.id">{{l.anio}}-{{l.periodo}}</option>
                  </select>
                  <app-form-validate-errors [group]="searchstudentForm"
                                            [controlName]="'ciclo_academico_id'"></app-form-validate-errors>
                </div>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm">
                  <label class="col-form-label"><b>Pago: </b><span class="text-danger">(*)</span></label>
                </div>
                <div class="input-group input-group-sm input-group-rounded">
                  <input type="text" class="form-control form-control-sm" formControlName="pago"
                         id="pago"
                         placeholder="pago">
                </div>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Seleccione un Modulo. </b> </label>
                </div>
              </div>
            </div>
          </form>
          <hr>
          <fieldset class="form-group">
            <legend class="bg-primary fs-5">Modalidad</legend>
          <form [formGroup]=tuitionForm class="row mt-2 d-flex justify-content-start align-items-center ">
            <div class="row pb-2 mx-2">
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Modalidad: </b><span class="text-danger">(*)</span> </label>
                  <select class="form-control form-select form-control-sm" formControlName="modalidad"
                          id="modalidad">
                    <option value="">Selecciona</option>
                    <option *ngFor="let l of modalitys" [value]="l.id">
                      {{l.nombre}}
                    </option>
                  </select>
                </div>
                <app-form-validate-errors [group]="tuitionForm"
                                          [controlName]="'modalidad'"></app-form-validate-errors>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Especialidad. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="especialidad_id"
                          id="especialidad_id">
                    <option value=''>Selecciona la especicalidad</option>
                    <option *ngFor="let l of specialties" [value]="l.id">{{l.nombre}}</option>
                  </select>
                  <app-form-validate-errors [group]="tuitionForm"
                                            [controlName]="'especialidad_id'"></app-form-validate-errors>
                </div>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Modulo. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="modulo_id"
                          id="modulo_id">
                    <option value=''>Selecciona la modulo</option>
                    <option *ngFor="let l of academicModules" [value]="l.id">{{l.nombre}}</option>
                  </select>
                  <app-form-validate-errors [group]="tuitionForm"
                                            [controlName]="'modulo_id'"></app-form-validate-errors>
                </div>
              </div>
              <div class="form-group col-md-3 ">
                <div class="input-group input-group-sm input-group-rounded row mx-auto">
                  <label class="col-form-label"><b>Turno. </b> </label>
                  <select class="form-control form-select form-control-sm" formControlName="especialidad_modulo_id"
                          id="especialidad_modulo_id">
                    <option value=''>Selecciona el Turno</option>
                    <option *ngFor="let l of manageModules" [value]="l.id">{{l.turno_hora}}</option>
                  </select>
                  <app-form-validate-errors [group]="tuitionForm"
                                            [controlName]="'especialidad_modulo_id'"></app-form-validate-errors>
                </div>
              </div>
            </div>
          </form>
          </fieldset>
          <hr>
          <fieldset class="form-group">
            <legend class="bg-primary fs-5">Pago</legend>
            <div class="row pb-2 mx-2">
              <div class="form-group col-md-6 required">
                <div class="input-group input-group-sm input-group-rounded">
                  <input type="text" class="form-control form-control-sm"
                         id="voucher_numero_operacion"
                         placeholder="Numero de operación del comprobante">
                </div>
              </div>
              <div class="form-group col-md-6 required">
                <div class="input-group input-group-sm input-group-rounded">
                  <div class="d-flex justify-content-center align-items-center">
                    <div>
                      <div *ngIf="previewFile.imRearLeftFront" class="auto-gm-img">
                        <img [src]="previewFile.imRearLeftFront"
                             alt="imRearLeftFront"
                             height="200">
                      </div>
                      <div *ngIf="!previewFile.imRearLeftFront" class="img-load">
                        <img src="../../../../../../../assets/images/voucher.png"
                             alt="imRearLeftFront" height="90">
                      </div>
                      <div class="file-input d-flex justify-content-center mt-2">
                        <input type="file" class="file" id="imRearLeftFront"
                               (change)="onFileImgVoucher($event)">
                        <label for="imRearLeftFront"><i
                          class="{{abcForms.btnIMG.icon}}"></i> Seleccionar
                          Voucher
                          <p class="file-name"></p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </fieldset>
      <hr>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
        </button>
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="tuitionForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class TuitionNewComponent implements OnInit {
  //@Input() title: string = '';
  abcForms: any;

  public modalitys: Modality[]=[];
  public error: string = '';
  public cicles: Cicle[] = [];
  public specialties: Specialty[] = [];
  public manageModules: ManageModule[] = [];
  public academicModules: AcademicModule[] = [];
  public tuition: Tuition[] = [];
  previewFile: any = {};


  tuitionForm = new FormGroup({
    estudiante_id: new FormControl(''),
    ciclo_academico_id: new FormControl(''),
    especialidad_id: new FormControl(''),
    modulo_id: new FormControl(''),
    especialidad_modulo_id: new FormControl(''),
    pago: new FormControl(0),
    importe_pago: new FormControl(0),
    voucher_numero_operacion: new FormControl(''),
    voucher_img: new FormControl(''),
    modalidad: new FormControl(''),
    voucher_aprobado: new FormControl(0),
    observacion: new FormControl(''),
    fecha: new FormControl(''),
  });
  searchstudentForm = new FormGroup({
    estudiante_id: new FormControl('', [Validators.required]),
    ciclo_academico_id: new FormControl(2, [Validators.required]),
    nombresAll: new FormControl('', [Validators.required]),
    pago: new FormControl('', [Validators.required]),
    dni: new FormControl(''),
  })
constructor(
              private tuitionService: TuitionService,
              private manageModuleService: ManageModuleService,
              private academicModuleService: AcademicModuleService,
              private cicleService: CicleService,
              private specialtyService: SpecialtyService,
              private confirmDialogService: ConfirmDialogService,
              private studentService: StudentService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.modalitys = modality;
    this.getCicles();
    this.getSpecialties();
    this.tuitionForm.controls['especialidad_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getAcademicModuleBySpecialtieId(val);
      }
    });
    this.tuitionForm.controls['modulo_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getTurnoByAcademicModuleId(val);
      }
    });
  }
  public getAcademicModuleBySpecialtieId(specialtieId:string): void {
    this.academicModuleService.getBySpecialtieId$(specialtieId).subscribe(response => {
      this.academicModules = response.data || [];
    }, error => {
      this.error = error;
    });
  }
  onInputChange(){
    // @ts-ignore
    this.getStudentById(this.searchstudentForm.value.dni)
  }
  public getStudentById(dni:number): void {
    this.studentService.getStudentByDni$(dni).subscribe(response => {
      console.log(response.data)
      this.searchstudentForm.patchValue({
        nombresAll: response.data.nombres+' '+response.data.apellido_pa+' '+response.data.apellido_ma,
        estudiante_id: response.data.id
      })
      //this.academicModules = response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getTurnoByAcademicModuleId(academicModuleId:string): void {
    this.manageModuleService.getByAcademicModuleId$(academicModuleId).subscribe(response => {
      this.manageModules = response.data || [];
      this.tuitionForm.value.modulo_id = response.data.modulo_id
    }, error => {
      this.error = error;
    });
  }
  public getCicles(): void {
    this.cicleService.getAll$().subscribe(response => {
      this.cicles = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getSpecialties(): void {
    this.specialtyService.getAll$().subscribe(response => {
      this.specialties = response && response.data.data || [];
    }, error => {
      this.error = error;
    });
  }

  public saveForm(): void {
    // @ts-ignore
    var id_estudent = this.searchstudentForm.value.estudiante_id;
    var id_ciclo_academic = this.searchstudentForm.value.ciclo_academico_id;

    if (this.tuitionForm.valid) {
      const formData = new FormData;
      // @ts-ignore
      formData.append('estudiante_id', id_estudent.toString());
      // @ts-ignore
      formData.append('ciclo_academico_id', id_ciclo_academic.toString());
      // @ts-ignore
      formData.append('pago', this.tuitionForm.get('pago').value);
      // @ts-ignore
      formData.append('ciclo_academico_id', this.tuitionForm.get('ciclo_academico_id').value);
      // @ts-ignore
      formData.append('especialidad_id', this.tuitionForm.get('especialidad_id').value);
      // @ts-ignore
      formData.append('especialidad_id', this.tuitionForm.get('especialidad_id').value);
      // @ts-ignore
      formData.append('modulo_id', this.tuitionForm.get('modulo_id').value);
      // @ts-ignore
      formData.append('especialidad_modulo_id', this.tuitionForm.get('especialidad_modulo_id').value);
      // @ts-ignore
      formData.append('importe_pago', this.tuitionForm.get('importe_pago').value);
      // @ts-ignore
      formData.append('voucher_numero_operacion', this.tuitionForm.get('voucher_numero_operacion').value);
      // @ts-ignore
      formData.append('voucher_img', this.tuitionForm.get('voucher_img').value);
      // @ts-ignore
      formData.append('modalidad', this.tuitionForm.get('modalidad').value);
      // @ts-ignore
      formData.append('voucher_aprobado', this.tuitionForm.get('voucher_aprobado').value);
      // @ts-ignore
      formData.append('observacion', this.tuitionForm.get('observacion').value);
      // @ts-ignore
      formData.append('fecha', this.tuitionForm.get('fecha').value);
    this.confirmDialogService.confirmSave().then(() => {
        this.tuitionService.add$(formData).subscribe(response => {
          this.router.navigate(['../'], {relativeTo: this.route});
        }, error => {
          this.error = error;
        });
      }).catch(() => {
      });
    }
  }
  onFileImgVoucher(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewFile.imRearLeftFront = reader.result;
      };
      // @ts-ignore
      this.tuitionForm.get('voucher_img').setValue(file);
    }
  }

  public cancelForm(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
