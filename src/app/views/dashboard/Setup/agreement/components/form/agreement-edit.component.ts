import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {Agreement} from "../../models/agreement";
import {InstitutionAgreementService} from "../../../../../../providers/services";
import {UbigeoService} from "../../../../../../providers/services/setup/ubigeo.service";
import {Dep, Dist, Prov} from "../../models/ubigeo";


@Component({
  selector: 'app-agreement-edit',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>

    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active"><i class="{{ abcForms.btnNew.icon }}"></i> Edición de Convenio</a>
        </li>
      </ul>
      <form [formGroup]=agreementForm class="row mt-2 d-flex justify-content-start align-items-center ">
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Datos Del Convenio</legend>
          <div class="row pb-2">

            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Nombre. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="nombre"
                       id="nombre"
                       placeholder="Nombre">
              </div>
              <app-form-validate-errors [group]=agreementForm
                                        [controlName]="'nombre'"></app-form-validate-errors>
            </div>

            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Dirección. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="text" class="form-control form-control-sm" formControlName="direccion"
                       id="direccion"
                       placeholder="Direccion">
              </div>
              <app-form-validate-errors [group]=agreementForm
                                        [controlName]="'direccion'"></app-form-validate-errors>
            </div>

            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Celular. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="email" class="form-control form-control-sm" formControlName="celular"
                       id="celular"
                       placeholder="Ingrese solo numero">
              </div>
              <app-form-validate-errors [group]=agreementForm
                                        [controlName]="'celular'"></app-form-validate-errors>
            </div>

            <div class="form-group col-md-3 required">
              <div class="input-group input-group-sm">
                <label class="col-form-label"><b>Correo. <span class="text-danger">(*)</span></b></label>
              </div>
              <div class="input-group input-group-sm input-group-rounded">
                <input type="email" class="form-control form-control-sm" formControlName="correo"
                       id="correo"
                       placeholder="Correo@gmail.com">
              </div>
              <app-form-validate-errors [group]=agreementForm
                                        [controlName]="'correo'"></app-form-validate-errors>
            </div>
          </div>
        </fieldset>
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Ubicación</legend>
          <div class="row pb-2">
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Departamento. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="departamento_id"
                        id="direccion_dep" (change)="getProvince($event)">
                  <option value="">Selecciona Departamento</option>
                  <option *ngFor="let l of Deps" [value]="l.cod_dep_sunat">
                    {{l.desc_dep_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="agreementForm"
                                        [controlName]="'direccion_dep'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3">
              <div class="input-group input-group-sm input-group-rounded row mx-auto">
                <label class="col-form-label"><b>Provincia. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="provincia_id"
                        id="direccion_prov" (change)="getDistrite($event)">
                  <option value="">Selecciona Provincia</option>
                  <option *ngFor="let l of Provs" [value]="l.cod_prov_sunat">
                    {{l.desc_prov_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="agreementForm"
                                        [controlName]="'direccion_prov'"></app-form-validate-errors>
            </div>
            <div class="form-group col-md-3 ">
              <div class="input-group input-group-sm input-group-rounded row mx-auto" >
                <label class="col-form-label"><b>Distrito. </b> </label>
                <select class="form-control form-select form-control-sm" formControlName="distrito_id"
                        id="direccion_dist">
                  <option value="">Selecciona Distrito</option>
                  <option *ngFor="let l of Dists" [value]="l.cod_ubigeo_sunat">
                    {{l.desc_ubigeo_sunat}}
                  </option>
                </select>
              </div>
              <app-form-validate-errors [group]="agreementForm"
                                        [controlName]="'distrito_id'"></app-form-validate-errors>
            </div>
          </div>
        </fieldset>
      </form>
      <hr>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
        </button>
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="agreementForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class AgreementEditComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public idAgreement: number = 0;
  public agreement = new Agreement();
  public Deps: Dep[] = [];
  public Provs: Prov[] = [];
  public Dists: Dist[] = [];

  agreementForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    departamento_id: new FormControl('', [Validators.required]),
    provincia_id: new FormControl('', [Validators.required]),
    distrito_id: new FormControl('', [Validators.required]),
  });


  constructor(private agreementService: InstitutionAgreementService,
              private ubigeoService: UbigeoService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.route.params.subscribe(res => {
      this.idAgreement = parseInt(res['idAgreement']);
      this.institutionAgreementGetById(this.idAgreement);
    });
    this.getUbigeo();
  }

  institutionAgreementGetById(idAgreement: number): void {
    this.agreementService.getById$(idAgreement).subscribe(response => {
      this.agreement = response.data;
      this.getUbigeosProv(response.data.departamento_id);
      this.getUbigeosDist(response.data.provincia_id);
      // @ts-ignore
      this.institutionAgreementPatchValue(this.agreement);

    });
  }

  public institutionAgreementPatchValue(agreement: Agreement): void {
    // @ts-ignore
    this.agreementForm.patchValue(agreement);
  }

  public saveForm(): void {
    if (this.agreementForm.valid) {

      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.agreementService.update$(this.idAgreement,this.agreementForm.value).subscribe(response => {
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
  public getUbigeo(): void {
    this.ubigeoService.getUbigeoDepartment$().subscribe(response => {
      this.Deps = response.data;
    });
  }

  public getProvince(event: any):void {
    this.ubigeoService.getUbigeoProvince$(event.target.value).subscribe(response => {
      this.Provs = response.data || []
    })
  }
  public getDistrite(event: any):void {
    this.ubigeoService.getUbigeoDistric$(event.target.value).subscribe(response => {
      this.Dists = response.data || []
    })
  }

  public getUbigeosProv(id: string):void {
    this.ubigeoService.getUbigeoProvince$(id).subscribe(response => {
      this.Provs = response.data || []
    })
  }
  public getUbigeosDist(id: string):void {
    this.ubigeoService.getUbigeoDistric$(id).subscribe(response => {
      this.Dists = response.data || []
    })
  }
}
