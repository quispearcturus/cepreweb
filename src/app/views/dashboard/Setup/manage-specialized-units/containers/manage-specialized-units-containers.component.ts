import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageModule } from '../../manage-module/models/manage-module';
import { ManageModuleService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';
@Component({
  selector: 'app-manage-specialized-units-container',
  template: `
    <app-manage-specialized-units-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-manage-specialized-units-filter>
    <app-manage-specialized-units-list
      [manageModules]="manageModules"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-manage-specialized-units-list>
    <app-pagination
      [pagination]="pagination"
      (eventPaginate)="eventPaginate($event)"
    >
    </app-pagination>
  `,
})
export class ManageSpecializedUnitsContainersComponent implements OnInit {
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
        this.pagination = (response && response.data.paginacion) || {};
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

  public eventDelete(idCicle: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.manageModuleService.delete$(idCicle).subscribe((response) => {
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
          'REPORTE DE PERSONAL',
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
        ],
        body: [
          [
            { text: 'Ciclo', style: 'tableHeader' },
            { text: 'Especialidad', style: 'tableHeader' },
            { text: 'Modulo', style: 'tableHeader' },
            { text: 'Programa', style: 'tableHeader' },
            { text: 'Hora de Turno', style: 'tableHeader' },
            { text: 'Docente', style: 'tableHeader' },
            { text: 'Laboratorio', style: 'tableHeader' },
            { text: 'Vacantes', style: 'tableHeader' },
            { text: 'Seccion', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.ciclo, style: 'tableBody' },
              { text: ed.especialidad, style: 'tableBody' },
              { text: ed.modulo, style: 'tableBody' },
              { text: ed.programa, style: 'tableBody' },
              { text: ed.turno_hora, style: 'tableBody' },
              { text: ed.docente, style: 'tableBody' },
              { text: ed.laboratorio, style: 'tableBody' },
              { text: ed.vacantes, style: 'tableBody' },
              { text: ed.seccion, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = [
      'NOMBRES',
      'APELLIDO PATERNO',
      'APELLIDO MATERNO',
      'DNI',
      'EMAIL',
      'CELULAR',
      'SEXO',
      'NACIMIENTO',
      'DEPARTAMENTO',
      'PROVINCIA',
      'DISTRITO',
      'GRADO INSTRICCIÓN',
    ];
    this.manageModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.manageModules = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE PERSONAL',
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
        ed.programa,
        ed.turno_hora,
        ed.docente,
        ed.laboratorio,
        ed.vacantes,
        ed.seccion,
      ]);
    });
    return result;
  }
}
