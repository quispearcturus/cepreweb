import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from '../models/laboratory';
import { LaboratoryService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-laboratory-container',
  template: `
    <app-laboratory-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-laboratory-filter>
    <app-laboratory-list
      [laboratories]="laboratories"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-laboratory-list>
    <!--  <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>-->
  `,
})
export class LaboratoryContainersComponent implements OnInit {
  public error: string = '';
  public laboratories: Laboratory[] = [];
  public laboratory = new Laboratory();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private laboratoryService: LaboratoryService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getLaboratorys();
  }

  public getLaboratorys(params?: Object): void {
    this.laboratoryService.getWithQuery$(params).subscribe(
      (response) => {
        console.log(response.data);
        this.laboratories = response.data.data;
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
    this.getLaboratorys($event);
  }

  public eventNew($event: boolean): void {
    if ($event) {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  public eventEdit(idLaboratory: number): void {
    this.router.navigate(['edit', { idLaboratory: idLaboratory }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idLaboratory: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.laboratoryService.delete$(idLaboratory).subscribe((response) => {
          this.laboratories = (response && response.data) || [];
        });
      })
      .catch(() => {});
  }
  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getLaboratorys($event);
  }
  public eventDownload(params?: Object): void {
    this.laboratoryService.getWithQuery$(params).subscribe(
      (response) => {
        this.laboratories = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE LABORATORIOS',
          this.convertDataToPDF(this.laboratories),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Laboratory[]): any {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Descripcion', style: 'tableHeader' },
            { text: 'Capacidad Laboratorio', style: 'tableHeader' },
            { text: 'Cantidad de Maquinas', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombre, style: 'tableBody' },
              { text: ed.descripcion, style: 'tableBody' },
              { text: ed.capacidad_laboratorio, style: 'tableBody' },
              { text: ed.cantidad_maquinas, style: 'tableBody' },
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
      'DESCRIPCION',
      'CAPACIDAD DE LABORATORIO',
      'CANTIDAD DE MAQUINAS',
      'ESTADO',
    ];
    this.laboratoryService.getWithQuery$(params).subscribe(
      (response) => {
        this.laboratories = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE LABORATORIOS',
          header,
          this.convertDataToExcel(this.laboratories)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Laboratory[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.nombre,
        ed.descripcion,
        ed.capacidad_laboratorio,
        ed.cantidad_maquinas,
        ed.estado,
      ]);
    });
    return result;
  }
}
