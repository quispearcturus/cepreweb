import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Cicle } from '../models/cicle';
import { CicleService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-cicle-container',
  template: `
    <app-cicle-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-cicle-filter>
    <app-cicle-list
      [cicles]="cicles"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-cicle-list>
    <!--  <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>-->
  `,
})
export class CicleContainersComponent implements OnInit {
  public error: string = '';
  public cicles: Cicle[] = [];
  public cicle = new Cicle();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private cicleService: CicleService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCicles();
  }

  public getCicles(params?: Object): void {
    this.cicleService.getWithQuery$(params).subscribe(
      (response) => {
        this.cicles = response.data.data;
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
    this.getCicles($event);
  }

  public eventNew($event: boolean): void {
    if ($event) {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  public eventEdit(idCicle: number): void {
    this.router.navigate(['edit', { idCicle: idCicle }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idCicle: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.cicleService.delete$(idCicle).subscribe((response) => {
          this.cicles = (response && response.data) || [];
        });
      })
      .catch(() => {});
  }
  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getCicles($event);
  }
  public eventDownload(params?: Object): void {
    this.cicleService.getWithQuery$(params).subscribe(
      (response) => {
        this.cicles = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE CICLO',
          this.convertDataToPDF(this.cicles),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Cicle[]): any {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Año', style: 'tableHeader' },
            { text: 'Periodo', style: 'tableHeader' },
            { text: 'Inicio de Ciclo', style: 'tableHeader' },
            { text: 'Fin de Ciclo', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.anio, style: 'tableBody' },
              { text: ed.periodo, style: 'tableBody' },
              { text: ed.fe_inicio_ciclo, style: 'tableBody' },
              { text: ed.fe_fin_ciclo, style: 'tableBody' },
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
      'AÑO',
      'PERIODO',
      'FECHA DE INICIO DE CICLO',
      'FECHA DE FIN DE CICLO',
      'ESTADO',
    ];
    this.cicleService.getWithQuery$(params).subscribe(
      (response) => {
        this.cicles = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE CICLO',
          header,
          this.convertDataToExcel(this.cicles)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Cicle[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.anio,
        ed.periodo,
        ed.fe_inicio_ciclo,
        ed.fe_fin_ciclo,
        ed.estado,
      ]);
    });
    return result;
  }
}
