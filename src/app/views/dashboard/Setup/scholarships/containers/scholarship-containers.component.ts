import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Scholarship } from '../models/scholarship';
import { ScholarshipService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-scholarship-container',
  template: `
    <app-scholarship-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-scholarship-filter>
    <app-scholarship-list
      [scholarships]="scholarships"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-scholarship-list>
    <!--  <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>-->
  `,
})
export class ScholarshipContainersComponent implements OnInit {
  public error: string = '';
  public scholarships: Scholarship[] = [];
  public scholarship = new Scholarship();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private scholarshipService: ScholarshipService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getScholarshipss();
  }

  public getScholarshipss(params?: Object): void {
    this.scholarshipService.getWithQuery$(params).subscribe(
      (response) => {
        this.scholarships = response.data.data;
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
    this.getScholarshipss($event);
  }

  public eventNew($event: boolean): void {
    if ($event) {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  public eventEdit(idScholarship: number): void {
    this.router.navigate(['edit', { idScholarship: idScholarship }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idScholarship: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.scholarshipService.delete$(idScholarship).subscribe((response) => {
          this.scholarships = (response && response.data) || [];
        });
      })
      .catch(() => {});
  }

  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getScholarshipss($event);
  }
  public eventDownload(params?: Object): void {
    this.scholarshipService.getWithQuery$(params).subscribe(
      (response) => {
        this.scholarships = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE BECAS',
          this.convertDataToPDF(this.scholarships),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Scholarship[]): any {
    return {
      table: {
        widths: ['auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Monto', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombre, style: 'tableBody' },
              { text: ed.monto, style: 'tableBody' },
              { text: ed.estado, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }

  eventExport(params?: Object): void {
    const header = ['NOMBRE', 'ESTADO', 'MONTO'];
    this.scholarshipService.getWithQuery$(params).subscribe(
      (response) => {
        this.scholarships = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE BECAS',
          header,
          this.convertDataToExcel(this.scholarships)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }
  private convertDataToExcel(data: Scholarship[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([ed.nombre, ed.monto, ed.estado]);
    });
    return result;
  }
}
