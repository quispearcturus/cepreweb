import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicModule } from '../models/academic-module';
import { StaffService } from '../../../../../providers/services/setup/staff.service';
import { AcademicModuleService } from '../../../../../providers/services/setup/academic-module.service';
import { Staff } from '../../staffs/models/staff';
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
      [academicModules]="academicModules"
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
export class AcademicModuleContainersComponent implements OnInit {
  public error: string = '';
  public academicModules: AcademicModule[] = [];
  public academicModule = new AcademicModule();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private academicModuleService: AcademicModuleService,
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
    this.academicModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.academicModules = response.data.data;
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

  public eventEdit(idModule: number): void {
    this.router.navigate(['edit', { idModule: idModule }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idCicle: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.academicModuleService.delete$(idCicle).subscribe((response) => {
          this.academicModules = (response && response.data) || [];
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
    this.academicModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.academicModules = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE MÓDULO ACADÉMICO',
          this.convertDataToPDF(this.academicModules),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: AcademicModule[]): any {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'ESPECIALIDAD', style: 'tableHeader' },
            { text: 'CRÉDITO', style: 'tableHeader' },
            { text: 'CANTIDAD HORAS', style: 'tableHeader' },
            { text: 'NIVEL', style: 'tableHeader' },
            { text: 'PROGRAMA', style: 'tableHeader' },
            { text: 'ESTADO', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombre, style: 'tableBody' },
              { text: ed.especialidad_id, style: 'tableBody' },
              { text: ed.credito, style: 'tableBody' },
              { text: ed.cantidad_horas, style: 'tableBody' },
              { text: ed.nivel_ciclo_id, style: 'tableBody' },
              { text: ed.tipo_programa_id, style: 'tableBody' },
              { text: ed.estado, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = [
      'NOMBRE',
      'ESPECIALIDAD',
      'CRÉDITO',
      'CANTIDAD HORAS',
      'NIVEL',
      'PROGRAMA',
      'ESTADO',
    ];
    this.academicModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.academicModules = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE MÓDULO ACADÉMICO',
          header,
          this.convertDataToExcel(this.academicModules)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: AcademicModule[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.nombre,
        ed.especialidad_id,
        ed.credito,
        ed.cantidad_horas,
        ed.nivel_ciclo_id,
        ed.tipo_programa_id,
        ed.estado,
      ]);
    });
    return result;
  }
}
