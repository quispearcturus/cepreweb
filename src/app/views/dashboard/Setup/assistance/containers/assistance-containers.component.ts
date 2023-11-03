import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Assistance } from '../models/assistance';
import { ExcelService, PdfService } from '../../../../../shared/files';
import { AssistanceService } from '../../../../../providers/services';

@Component({
  selector: 'app-assistance-container',
  template: `
    <app-assistance-filter (eventFilter)="getAsistenciaStudentsSpecialiteModuleId($event); showNav = true"></app-assistance-filter>
    <div *ngIf="showNav">
      <ng-container *ngIf="assistances && assistances.length > 0">
        <div *ngIf="showNav">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item pointer" (click)="showAssistances()">
              <a class="nav-link active" [ngClass]="{'active': activeLink === 'assistance'}">Asistencia</a>
            </li>
            <li class="nav-item pointer" (click)="showReportAssistances()">
              <a class="nav-link" [ngClass]="{'active': activeLink === 'reportAssistance'}">Reporte de asistencias</a>
            </li>
          </ul>
        </div>
      </ng-container>
      <ng-container *ngIf="assistances && assistances.length === 0">
        <div class="col-md-12 d-flex justify-content-center text-center">
          <h3>El modulo seleccionado o el horario el cual selecciono no dispone de alumnos matriculados, por favor seleccione el correcto.</h3>
        </div>
      </ng-container>
    </div>
    <div *ngIf="showAssistancesContent && showNav">
      <app-assistance-new [assistances]="assistances"></app-assistance-new>
    </div>
    <div *ngIf="showReportAssistancesContent && showNav">
      <app-assistance-list [assistances]="assistances"></app-assistance-list>
    </div>
  `,
  styles: ['.nav-item, .nav-link {cursor: pointer;}']
})
export class AssistanceContainersComponent implements OnInit {
  showAssistancesContent = false;
  showReportAssistancesContent = false;
  showNav = false;
  activeLink = '';
  public error: string = '';
  public assistances: Assistance[] = [];
  public assistance = new Assistance();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private assistanceService: AssistanceService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAll();
  }
  showAssistances() {
    this.showAssistancesContent = true;
    this.showReportAssistancesContent = false;
    this.activeLink = 'assistance';
  }

  showReportAssistances() {
    this.showAssistancesContent = false;
    this.showReportAssistancesContent = true;
    this.activeLink = 'reportAssistance';
  }
  public getAll(params?: Object): void {
    this.assistanceService.getWithQuery$(params).subscribe(
      (response) => {
        this.assistances = response.data.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  public eventFilter($event: Object): void {
    this.filter = $event;
    $event = Object.assign(this.pagination, $event);
    this.getAll($event);
  }

  public eventNew($event: boolean): void {
    if ($event) {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  public eventEdit(idManage: number): void {
    this.router.navigate(['edit', { idManage: idManage }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idManage: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.assistanceService.delete$(idManage).subscribe((response) => {
          this.assistances = (response && response.data) || [];
        });
      })
      .catch(() => {});
  }
  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getAll($event);
  }
  public eventDownload(params?: Object): void {
    this.assistanceService.getWithQuery$(params).subscribe(
      (response) => {
        this.assistances = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE ASISTECNCIA',
          this.convertDataToPDF(this.assistances),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Assistance[]): any {
    return {
      table: {
        widths: [
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
        ],
        body: [
          [
            { text: 'Estudiante', style: 'tableHeader' },
            { text: 'Ciclo Academico', style: 'tableHeader' },
            { text: 'Especialidad', style: 'tableHeader' },
            { text: 'Modulo', style: 'tableHeader' },
            { text: 'Especialidad de Modulo', style: 'tableHeader' },
            { text: 'Pago', style: 'tableHeader' },
            { text: 'Importe de Pago', style: 'tableHeader' },
            { text: 'Numero de Operacion', style: 'tableHeader' },
            { text: 'Imagen de Voucher', style: 'tableHeader' },
            { text: 'Modalidad', style: 'tableHeader' },
            { text: 'Aprobacion de voucher', style: 'tableHeader' },
            { text: 'Observacion', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              // { text: ed.estudiante_id, style: 'tableBody' },
              // { text: ed.ciclo_academico_id, style: 'tableBody' },
              // { text: ed.especialidad_id, style: 'tableBody' },
              // { text: ed.modulo_id, style: 'tableBody' },
              // { text: ed.especialidad_modulo_id, style: 'tableBody' },
              // { text: ed.pago, style: 'tableBody' },
              // { text: ed.importe_pago, style: 'tableBody' },
              // { text: ed.voucher_numero_operacion, style: 'tableBody' },
              // { text: ed.voucher_img, style: 'tableBody' },
              // { text: ed.modalidad, style: 'tableBody' },
              // { text: ed.voucher_aprobado, style: 'tableBody' },
              // { text: ed.observacion, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = [
      'ESTUDIANTE',
      'CICLO ACADEMICO',
      'ESPECIALIDAD',
      'MODULO',
      'ESPECIALIDAD DE MODULO',
      'PAGO',
      'IMPORTE DE PAGO',
      'NUMERO DE OPERACION',
      'IMAGEN DE VOUCHER',
      'MODALIDAD',
      'VOUCHER APROBADO',
      'OBSERVACION',
    ];
    this.assistanceService.getWithQuery$(params).subscribe(
      (response) => {
        this.assistances = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE MATRICULA',
          header,
          this.convertDataToExcel(this.assistances)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Assistance[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        // ed.estudiante_id,
        // ed.ciclo_academico_id,
        // ed.especialidad_id,
        // ed.modulo_id,
        // ed.especialidad_modulo_id,
        // ed.pago,
        // ed.importe_pago,
        // ed.voucher_numero_operacion,
        // ed.voucher_img,
        // ed.modalidad,
        // ed.voucher_aprobado,
        // ed.observacion,
      ]);
    });
    return result;
  }

  public getAsistenciaStudentsSpecialiteModuleId($event:object): void {
    this.showNav = true;
    this.activeLink = 'assistance';
    console.log($event);
    this.assistanceService.getWithQuery$($event).subscribe(response => {
      console.log(response);
      this.assistances=response.data;
      this.showAssistancesContent = (this.assistances && this.assistances.length > 0);
      this.showReportAssistancesContent = (this.assistances && this.assistances.length > 0);
    }, error => {
      this.error = error;
    });
  }
}
