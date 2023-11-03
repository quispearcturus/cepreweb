import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../../../../../providers/services/setup/student.service';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-cicle-container',
  template: `
    <app-student-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-student-filter>
    <app-student-list
      [students]="students"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-student-list>
    <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>
  `
})
export class StudentContainersComponent implements OnInit {
  public error: string = '';
  public students: Student[] = [];
  public student = new Student();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private studentService: StudentService,
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
    this.studentService.getWithQuery$(params).subscribe(response => {
      this.students = response.data.data;
      this.pagination = response && response.data.paginacion || {};
    }, error => {
      this.error = error;
    });
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
        this.studentService.delete$(idCicle).subscribe((response) => {
          this.students = (response && response.data) || [];
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
    this.studentService.getWithQuery$(params).subscribe(
      (response) => {
        this.students = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE ESTUDIANTES',
          this.convertDataToPDF(this.students),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Student[]): any {
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
    this.studentService.getWithQuery$(params).subscribe(
      (response) => {
        this.students = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE ESTUDIANTES',
          header,
          this.convertDataToExcel(this.students)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Student[]): any {
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
