import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abcForms} from 'src/environments/generals';
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {AcademicModuleService} from "../../../../../../providers/services/setup/academic-module.service";
import {CycleLevelService, SpecialtyService} from "../../../../../../providers/services";

@Component({
  selector: 'app-manage-specialized-units-edit',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
        <fieldset class="form-group">
          <legend class="bg-primary fs-5">Módulo</legend>
          <div class="row pb-2 p-4">
            <div class="form-group row p-2 shadow mb-4"  *ngFor="let v of items ; let i=index">
              <div class="col-md-6">

                <div class="input-group input-group-sm input-group-rounded">
                <textarea  class="form-control form-control-sm"
                           style="height: auto"
                           id="name"
                           placeholder="Nombre" [value]="v.name"></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group input-group-sm input-group-rounded col-md-6"  *ngFor="let v2 of v.items ; let i=index">
                <textarea  class="form-control form-control-sm mb-1"
                           id="name"
                           placeholder="Nombre" [value]="v2"></textarea>
                </div>
                <button (click)="addItemToList1(i)" class="btn btn-primary btn-gm-sm mt-1">Agregar</button>
              </div>
            </div>
            <button (click)="addItemTo()" class="btn btn-primary btn-gm-sm mt-2">Add Item to List 1</button>
          </div>
        </fieldset>
      <hr>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
        </button>
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="manageForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class ManageSpecializedUnitsEditComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public idManage: number = 0;

  items = [
    {
      name: 'List 1',
      items: ['Item 1']
    },
  ];
  newItem = '';
 /* public academicModule = new AcademicModule();
  public levelCicles: LevelCicle[] = [];*/
  manageForm = new FormGroup({
    name: new FormControl(''),
    items: new FormControl([[]]),
  });


  constructor(private academicModuleService: AcademicModuleService,
              private cycleLevelService: CycleLevelService,
              private specialtyService: SpecialtyService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.route.params.subscribe(res => {
      this.idManage = parseInt(res['idManage']);
      this.GetById(this.idManage);
    });
  }
  addItemToList1(i: number) {
    this.items[i].items.push(this.newItem);
    this.newItem = '';
  }
  addItemTo() {
    this.items.push({
      name: '',
      items: ['']
    });
  }


  GetById(idModule: number): void {
   /* this.academicModuleService.getById$(idModule).subscribe(response => {
      //this.academicModule = response.data;
      // @ts-ignore
      this.academiCyclePatchValue(this.academicModule);

    });*/
  }

/*
  public academiCyclePatchValue(academicModule: AcademicModule): void {
    // @ts-ignore
    this.moduleForm.patchValue(academicModule);
  }
*/

  public public_data(): void {
    console.log(this.items);

  }

  public saveForm(): void {
    console.log(this.items)
    /*if (this.manageForm.valid) {
      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.academicModuleService.update$(this.idManage,this.manageForm.value).subscribe(response => {
          this.router.navigate(['../'], {relativeTo: this.route});
        }, error => {
          this.error = error;
        });
      }).catch(() => {
      });
    }*/
  }
  public cancelForm(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
