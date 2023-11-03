import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { CycleLevel } from '../models/cycle-level';
import { CycleLevelService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-cycle-level-container',
  template: `
    <app-cycle-level-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-cycle-level-filter>
    <app-cycle-level-list
      [cycleLevels]="cycleLevels"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-cycle-level-list>
    <!--  <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>-->
  `,
})
export class CycleLevelContainerComponent implements OnInit {
  public error: string = '';
  public cycleLevels: CycleLevel[] = [];
  public cycleLevel = new CycleLevel();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private cycleLevelService: CycleLevelService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCycleLevels();
  }

  public getCycleLevels(params?: Object): void {
    this.cycleLevelService.getWithQuery$(params).subscribe(
      (response) => {
        this.cycleLevels = response.data.data;
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
    this.getCycleLevels($event);
  }

  public eventNew($event: boolean): void {
    if ($event) {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
  }

  public eventEdit(idCycleLevel: number): void {
    this.router.navigate(['edit', { idCycleLevel: idCycleLevel }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idCycleLevel: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.cycleLevelService.delete$(idCycleLevel).subscribe((response) => {
          this.cycleLevels = (response && response.data) || [];
        });
      })
      .catch(() => {});
  }

  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getCycleLevels($event);
  }
  public eventDownload(params?: Object): void {
    this.cycleLevelService.getWithQuery$(params).subscribe(
      (response) => {
        this.cycleLevels = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE NIVEL DE CICLO',
          this.convertDataToPDF(this.cycleLevels),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: CycleLevel[]): any {
    return {
      table: {
        widths: ['auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Resolucion Directorial', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombre, style: 'tableBody' },
              { text: ed.resolucion_directoral, style: 'tableBody' },
              { text: ed.estado, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = ['NOMBRE', 'RESOLUCION DIRECTORIAL', 'ESTADO'];
    this.cycleLevelService.getWithQuery$(params).subscribe(
      (response) => {
        this.cycleLevels = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE NIVEL DE CICLO',
          header,
          this.convertDataToExcel(this.cycleLevels)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: CycleLevel[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([ed.nombre, ed.resolucion_directoral, ed.estado]);
    });
    return result;
  }
}
