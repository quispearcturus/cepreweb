import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../models/staff';
import { StaffService } from '../../../../../providers/services/setup/staff.service';
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
      [staffs]="staffs"
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
export class StaffContainersComponent implements OnInit {
  public error: string = '';
  public staffs: Staff[] = [];
  public student = new Staff();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private staffService: StaffService,
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
    this.staffService.getWithQuery$(params).subscribe(
      (response) => {
        this.staffs = response.data.data;
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

  public eventEdit(idStudent: number): void {
    this.router.navigate(['edit', { idStudent: idStudent }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idCicle: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.staffService.delete$(idCicle).subscribe((response) => {
          this.staffs = (response && response.data) || [];
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
    this.staffService.getWithQuery$(params).subscribe(
      (response) => {
        this.staffs = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE PERSONAL',
          this.convertDataToPDF(this.staffs),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Staff[]): any {
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
            { text: 'Nombres', style: 'tableHeader' },
            { text: 'Apellido Paterno', style: 'tableHeader' },
            { text: 'Apellido Materno', style: 'tableHeader' },
            { text: 'DNI', style: 'tableHeader' },
            { text: 'Correo', style: 'tableHeader' },
            { text: 'Celular', style: 'tableHeader' },
            { text: 'Sexo', style: 'tableHeader' },
            { text: 'Nacimiento', style: 'tableHeader' },
            { text: 'Departamento', style: 'tableHeader' },
            { text: 'Provincia', style: 'tableHeader' },
            { text: 'Distrito', style: 'tableHeader' },
            { text: 'Grado de Instrucción', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombres, style: 'tableBody' },
              { text: ed.apellido_pa, style: 'tableBody' },
              { text: ed.apellido_ma, style: 'tableBody' },
              { text: ed.dni, style: 'tableBody' },
              { text: ed.correo_electronico, style: 'tableBody' },
              { text: ed.celular, style: 'tableBody' },
              { text: ed.sexo, style: 'tableBody' },
              { text: ed.fe_nacimiento, style: 'tableBody' },
              { text: ed.departamento_id, style: 'tableBody' },
              { text: ed.provincia_id, style: 'tableBody' },
              { text: ed.distrito_id, style: 'tableBody' },
              { text: ed.grado_instruccion_id, style: 'tableBody' },
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
    this.staffService.getWithQuery$(params).subscribe(
      (response) => {
        this.staffs = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE PERSONAL',
          header,
          this.convertDataToExcel(this.staffs)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Staff[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.nombres,
        ed.apellido_pa,
        ed.apellido_ma,
        ed.dni,
        ed.correo_electronico,
        ed.celular,
        ed.sexo,
        ed.fe_nacimiento,
        ed.departamento_id,
        ed.provincia_id,
        ed.distrito_id,
        ed.grado_instruccion_id,
      ]);
    });
    return result;
  }
}
