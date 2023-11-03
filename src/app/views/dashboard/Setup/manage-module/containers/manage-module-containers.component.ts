import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageModuleService } from '../../../../../providers/services';
import { ManageModule } from '../models/manage-module';
import { ExcelService, PdfService } from '../../../../../shared/files';
@Component({
  selector: 'app-cicle-container',
  template: `
    <app-staff-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-staff-filter>
    <app-staff-list
      [manageModules]="manageModules"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-staff-list>
    <app-pagination
      [pagination]="pagination"
      (eventPaginate)="eventPaginate($event)"
    >
    </app-pagination>
  `,
})
export class ManageModuleContainersComponent implements OnInit {
  public error: string = '';
  public manageModules: ManageModule[] = [];
  public manageModule = new ManageModule();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private manageModuleService: ManageModuleService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAll();
  }

  public getAll(params?: Object): void {
    this.manageModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.manageModules = response.data.data;
        //this.pagination = response && response.data.paginacion || {};
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
        this.manageModuleService.delete$(idManage).subscribe((response) => {
          this.manageModules = (response && response.data) || [];
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
    this.manageModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.manageModules = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE MANEJO DE MODULO',
          this.convertDataToPDF(this.manageModules),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: ManageModule[]): any {
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
          'auto',
          'auto',
          'auto',
        ],
        body: [
          [
            { text: 'Ciclo', style: 'tableHeader' },
            { text: 'Especialidad', style: 'tableHeader' },
            { text: 'Modulo', style: 'tableHeader' },
            { text: 'Docente', style: 'tableHeader' },
            { text: 'Laboratorio', style: 'tableHeader' },
            { text: 'Programa', style: 'tableHeader' },
            { text: 'Turno', style: 'tableHeader' },
            { text: 'Hora de Inicio', style: 'tableHeader' },
            { text: 'Hora de Fin', style: 'tableHeader' },
            { text: 'Vacantes', style: 'tableHeader' },
            { text: 'Seccion', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' },
            { text: 'Fecha de Inicio', style: 'tableHeader' },
            { text: 'Fecha Final', style: 'tableHeader' },
            { text: 'Turno de hora', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.ciclo, style: 'tableBody' },
              { text: ed.especialidad, style: 'tableBody' },
              { text: ed.modulo, style: 'tableBody' },
              { text: ed.docente, style: 'tableBody' },
              { text: ed.laboratorio, style: 'tableBody' },
              { text: ed.programa, style: 'tableBody' },
              { text: ed.turno, style: 'tableBody' },
              { text: ed.hora_inicio, style: 'tableBody' },
              { text: ed.hora_fin, style: 'tableBody' },
              { text: ed.vacantes, style: 'tableBody' },
              { text: ed.seccion, style: 'tableBody' },
              { text: ed.estado, style: 'tableBody' },
              { text: ed.fecha_inicio, style: 'tableBody' },
              { text: ed.fecha_fin, style: 'tableBody' },
              { text: ed.turno_hora, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = [
      'CICLO',
      'ESPECIALIDAD',
      'MODULO',
      'DOCENTE',
      'LABORATORIO',
      'PROGRAMA',
      'TURNO',
      'HORA DE INICIO',
      'HORA FINAL',
      'VACANTES',
      'SECCION',
      'ESTADO',
      'FECHA INICIO',
      'FECHA FINAL',
      'HORA DE TURNO',
    ];
    this.manageModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.manageModules = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE MANEJO DE MODULO',
          header,
          this.convertDataToExcel(this.manageModules)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: ManageModule[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.ciclo,
        ed.especialidad,
        ed.modulo,
        ed.docente,
        ed.laboratorio,
        ed.programa,
        ed.turno,
        ed.hora_inicio,
        ed.hora_fin,
        ed.vacantes,
        ed.seccion,
        ed.estado,
        ed.fecha_inicio,
        ed.fecha_fin,
        ed.turno_hora,
      ]);
    });
    return result;
  }
}
