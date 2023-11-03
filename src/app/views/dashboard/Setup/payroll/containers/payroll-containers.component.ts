import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageModule } from '../../manage-module/models/manage-module';
import { ManageModuleService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-payroll-container',
  template: `
    <app-payroll-filter
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-payroll-filter>
    <app-payroll-list [manageModules]="manageModules"></app-payroll-list>
    <app-pagination
      [pagination]="pagination"
      (eventPaginate)="eventPaginate($event)"
    >
    </app-pagination>
  `,
})
export class PayrollContainersComponent implements OnInit {
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

  public eventEdit(idModule: number): void {
    this.router.navigate(['edit', { idModule: idModule }], {
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
          'REPORTE DE PAGOS',
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
        widths: ['auto', 'auto'],
        body: [
          [
            { text: 'Modulo', style: 'tableHeader' },
            { text: 'Hora de Turno', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.modulo, style: 'tableBody' },
              { text: ed.turno_hora, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = ['MODULO', 'TURNO DE HORA'];
    this.manageModuleService.getWithQuery$(params).subscribe(
      (response) => {
        this.manageModules = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE PAGOS',
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
      result.push([ed.modulo, ed.turno_hora]);
    });
    return result;
  }
}
