import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Agreement } from '../models/agreement';
import { InstitutionAgreementService } from '../../../../../providers/services';
import { ExcelService, PdfService } from '../../../../../shared/files';

@Component({
  selector: 'app-agreement-container',
  template: `
    <app-agreement-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-agreement-filter>
    <app-agreement-list
      [agreements]="agreements"
      (eventEdit)="eventEdit($event)"
      (eventDelete)="eventDelete($event)"
    ></app-agreement-list>
    <app-pagination
      [pagination]="pagination"
      (eventPaginate)="eventPaginate($event)"
    >
    </app-pagination>
  `,
})
export class AgreementContainerComponent implements OnInit {
  public error: string = '';
  public agreements: Agreement[] = [];
  public agreement = new Agreement();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private institutionAgreementService: InstitutionAgreementService,
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
    this.institutionAgreementService.getWithQuery$(params).subscribe(
      (response) => {
        this.agreements = response.data.data;
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

  public eventEdit(idAgreement: number): void {
    this.router.navigate(['edit', { idAgreement: idAgreement }], {
      relativeTo: this.route,
    });
  }

  public eventDelete(idAgreement: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.institutionAgreementService
          .delete$(idAgreement)
          .subscribe((response) => {
            this.agreements = (response && response.data) || [];
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
    this.institutionAgreementService.getWithQuery$(params).subscribe(
      (response) => {
        this.agreements = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE CONTRATO',
          this.convertDataToPDF(this.agreements),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Agreement[]): any {
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
        ],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Direccion', style: 'tableHeader' },
            { text: 'Celular', style: 'tableHeader' },
            { text: 'Correo', style: 'tableHeader' },
            { text: 'Departamento', style: 'tableHeader' },
            { text: 'Provincia', style: 'tableHeader' },
            { text: 'Distrito', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.nombre, style: 'tableBody' },
              { text: ed.direccion, style: 'tableBody' },
              { text: ed.celular, style: 'tableBody' },
              { text: ed.correo, style: 'tableBody' },
              { text: ed.departamento_id, style: 'tableBody' },
              { text: ed.provincia_id, style: 'tableBody' },
              { text: ed.distrito_id, style: 'tableBody' },
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
      'DIRECCION',
      'CELULAR',
      'CORREO',
      'DEPARTAMENTO',
      'PROVINCIA',
      'DISTRITO',
    ];
    this.institutionAgreementService.getWithQuery$(params).subscribe(
      (response) => {
        this.agreements = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE CONTRATO',
          header,
          this.convertDataToExcel(this.agreements)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Agreement[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.nombre,
        ed.direccion,
        ed.celular,
        ed.correo,
        ed.departamento_id,
        ed.provincia_id,
        ed.distrito_id,
      ]);
    });
    return result;
  }
}
