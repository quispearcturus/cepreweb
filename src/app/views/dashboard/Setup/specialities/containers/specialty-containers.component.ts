import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialty } from '../models/specialty';
import { SpecialtyService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-especialty-container',
  template: `
    <app-especialty-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-especialty-filter>
    <app-specialty-list
      [specialties]="specialties"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-specialty-list>
    <!--  <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>-->
  `,
})
export class SpecialtyContainersComponent implements OnInit {
  public error: string = '';
  public specialties: Specialty[] = [];
  public specialty = new Specialty();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private specialtyService: SpecialtyService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSpecialtys();
  }

  public getSpecialtys(params?: Object): void {
    this.specialtyService.getWithQuery$(params).subscribe(
      (response) => {
        this.specialties = response.data.data;
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
    this.getSpecialtys($event);
  }

  public eventNew($event: boolean): void {
    if ($event) {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  public eventEdit(idSpecialty: number): void {
    this.router.navigate(['edit', { idSpecialty: idSpecialty }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idSpecialty: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.specialtyService.delete$(idSpecialty).subscribe((response) => {
          this.specialties = (response && response.data) || [];
        });
      })
      .catch(() => {});
  }

  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getSpecialtys($event);
  }
  public eventDownload(params?: Object): void {
    this.specialtyService.getWithQuery$(params).subscribe(
      (response) => {
        this.specialties = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE ESPECIALIDADES',
          this.convertDataToPDF(this.specialties),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Specialty[]): any {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Descripcion', style: 'tableHeader' },
            { text: 'Creditos', style: 'tableHeader' },
            { text: 'Cantidad de Horas', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombre, style: 'tableBody' },
              { text: ed.descripcion, style: 'tableBody' },
              { text: ed.creditos, style: 'tableBody' },
              { text: ed.cantidad_horas, style: 'tableBody' },
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
      'NOMBRES',
      'DESCRIPCION',
      'CREDITOS',
      'CANTIDAD DE HORAS',
      'ESTADO',
    ];
    this.specialtyService.getWithQuery$(params).subscribe(
      (response) => {
        this.specialties = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE ESPECIALIDADES',
          header,
          this.convertDataToExcel(this.specialties)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Specialty[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.nombre,
        ed.descripcion,
        ed.creditos,
        ed.cantidad_horas,
        ed.estado,
      ]);
    });
    return result;
  }
}
