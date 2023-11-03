import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms, section, turne} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {AcademicModuleService} from "../../../../../../providers/services/setup/academic-module.service";
import {
  CicleService,
  ManageModuleService,
  SpecialtyService
} from "../../../../../../providers/services";
import {Cicle} from "../../../cicle/models/cicle";
import {Specialty} from "../../../specialities/models/specialty";
import { ManageModule } from '../../../manage-module/models/manage-module';
import { Student } from '../../../students/models/student';
import { AcademicModule } from '../../../academic-module/models/academic-module';

@Component({
  selector: 'app-tuition-edit',
  template: ``
})
export class TuitionEditComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public idManage: number = 0;
  public students: Student[] = []
  public cicles: Cicle[] = [];
  public specialties: Specialty[] = [];
  public manageModules: ManageModule[] = [];
  public academicModules: AcademicModule[] = [];
  tuitionForm = new FormGroup({
    estudiante_id: new FormControl('', [Validators.required]),
    ciclo_academico_id: new FormControl('', [Validators.required]),
    especialidad_id: new FormControl('', [Validators.required]),
    modulo_id: new FormControl('', [Validators.required]),
    especialidad_modulo_id: new FormControl('', [Validators.required]),
    pago: new FormControl('', [Validators.required]),
    importe_pago: new FormControl('', [Validators.required]),
    voucher_numero_operacion: new FormControl('', [Validators.required]),
    voucher_img: new FormControl(0, [Validators.required]),
    modalidad: new FormControl('', [Validators.required]),
    voucher_aprobado: new FormControl(true, [Validators.required]),
    observacion: new FormControl(''),
  });


  constructor(private manageModuleService: ManageModuleService,
              private academicModuleService: AcademicModuleService,
              private cicleService: CicleService,
              private specialtyService: SpecialtyService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.route.params.subscribe(res => {
      this.idManage = parseInt(res['idManage']);
      this.GetById(this.idManage);
      this.tuitionForm.controls['especialidad_id'].valueChanges.subscribe(val => {
        if (val) {
          this.getAcademicModuleBySpecialtieId(val);
          this.getCicles();
          this.getSpecialties();
        }
      });
    });
  }
  public getAcademicModuleBySpecialtieId(specialtieId:string): void {
    this.academicModuleService.getBySpecialtieId$(specialtieId).subscribe(response => {
      this.academicModules = response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getCicles(): void {
    this.cicleService.getAll$().subscribe(response => {
      this.cicles = response && response.data || [];
    }, error => {
      this.error = error;
    });
  }
  public getSpecialties(): void {
    this.specialtyService.getAll$().subscribe(response => {
      this.specialties = response && response.data || [];
    }, error => {
      this.error = error;
    });
  }
  GetById(idManage: number): void {
    this.manageModuleService.getById$(idManage).subscribe(response => {
      //console.log(response.data)
      this.manageModules = response.data;
      // @ts-ignore
      this.manageModulePatchValue(this.manageModules);
    });
  }


  public saveForm(): void {
    if (this.tuitionForm.valid) {
     // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.manageModuleService.update$(this.idManage,this.tuitionForm.value).subscribe(response => {
          this.router.navigate(['../'], {relativeTo: this.route});
        }, error => {
          this.error = error;
        });
      }).catch(() => {
      });
    }
  }
  public cancelForm(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
