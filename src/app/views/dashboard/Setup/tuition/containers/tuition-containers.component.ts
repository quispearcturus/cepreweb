import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { TuitionService } from '../../../../../providers/services';
import { Tuition } from '../models/tuition';
import { ExcelService, PdfService } from '../../../../../shared/files';
import {Tuitions} from "../models/tuitions";
import {UserNewComponent} from "../../users/components/form/user-new.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TuitionEditCommentsComponent} from "../components/form/tuition-edit-comments.component";
import {TuitionViewVoucherComponent} from "../components/form/tuition-view-voucher.component";

@Component({
  selector: 'app-cicle-container',
  template: `
    <app-tuition-filter
      (eventNew)="eventNew($event)"
      (eventFilter)="eventFilter($event)"
      (eventPDF)="eventDownload($event)"
      (eventEXPORT)="eventExport($event)"
    ></app-tuition-filter>
    <app-tuition-list [tuitions]="tuitions1"
                      (eventEditComments)="eventEditComments($event)"
                      (eventEditApprovedVoucher)="eventEditApprovedVoucher($event)"
                      (eventDelete)="eventDelete($event)"
                      (eventViewImage)="eventViewImage($event)"
    ></app-tuition-list>
    <app-pagination [pagination]="pagination" (eventPaginate)="eventPaginate($event)">
      </app-pagination>
  `,
})
export class TuitionContainersComponent implements OnInit {
  public error: string = '';
  public tuitions: Tuition[] = [];
  public tuitions1: Tuitions[] = [];
  public tuition = new Tuition();
  pagination: any = {};
  private filter: Object = {};

  constructor(
    private tuitionService: TuitionService,
    private pdfService: PdfService,
    private excelService: ExcelService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.getAll();
  }

  public getAll(params?: Object): void {
    this.tuitionService.getWithQuery$(params).subscribe(
      (response) => {
        this.tuitions1 = response.data.data;
        this.pagination = response && response.data.paginacion || {};
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

  public eventEditComments(id: number): void {
    const listById = this.tuitionService.getById$(id).subscribe(async response => {
      this.tuition = response && response.data || {};
      await this.openMOdalEdit(this.tuition);
      listById.unsubscribe();
    });
  }
  public eventEditApprovedVoucher(id: number): void {
    const listById = this.tuitionService.getById$(id).subscribe(async response => {
      this.tuition = response && response.data || {};
      await this.openMOdalEditVocher(this.tuition);
      listById.unsubscribe();
    });
  }
  public eventViewImage(id: number): void {
    const listById = this.tuitionService.getById$(id).subscribe(async response => {
      this.tuition = response && response.data || {};
      await this.openMOdalViewVoucher(this.tuition);
      listById.unsubscribe();
    });
  }



  public eventDelete(id: number): void {
    this.confirmDialogService
      .confirmDelete()
      .then(() => {
        this.tuitionService.delete$(id).subscribe((response) => {
          this.tuitions1 = response && response.data.data;
        });
      })
      .catch(() => {});
  }
  eventPaginate($event: Object) {
    this.pagination = $event;
    $event = Object.assign(this.filter, $event);
    this.getAll($event);
  }
  public openMOdalEditVocher(data: Tuition): void {
    if (data.voucher_aprobado==true) {
      data.voucher_aprobado=false;
    }else {
      data.voucher_aprobado=true;
    }
    this.editTution(data.id!, data);
  }
  public openMOdalViewVoucher(data: Tuition): void {
    const imgForm = this.modalService.open(TuitionViewVoucherComponent);
    imgForm.componentInstance.title = 'Visualizador de IMAGEN' || null;
    imgForm.componentInstance.img = data.voucher_img;
  }

  public openMOdalEdit(data: Tuition): void {
    const commentsForm = this.modalService.open(TuitionEditCommentsComponent);
    commentsForm.componentInstance.title = 'Editar Comentario' || null;
    commentsForm.componentInstance.tuition = data;
    commentsForm.result.then((result: any) => {
      if (result) {
        this.editTution(data.id!, result);
      }
    });
  }
  public editTution(idTuition: number, data: Object) {
    this.confirmDialogService.confirmSave().then(() => {
      this.tuitionService.update$(idTuition, data).subscribe(response => {
        this.tuitions1 = response && response.data.data || [];
        this.pagination = response && response.data.paginacion || {};
      });
    }).catch(() => {
    });

  }


  public eventDownload(params?: Object): void {
    this.tuitionService.getWithQuery$(params).subscribe(
      (response) => {
        this.tuitions = response.data || [];
        this.pdfService.generatePdfGeneral(
          'REPORTE DE MATRICULA',
          this.convertDataToPDF(this.tuitions),
          false
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToPDF(data: Tuition[]): any {
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
            { text: 'Estudiante', style: 'tableHeader' },
            { text: 'Ciclo Academico', style: 'tableHeader' },
            { text: 'Especialidad', style: 'tableHeader' },
            { text: 'Modulo', style: 'tableHeader' },
            { text: 'Especialidad de Modulo', style: 'tableHeader' },
            { text: 'Pago', style: 'tableHeader' },
            { text: 'Importe de Pago', style: 'tableHeader' },
            { text: 'Numero de Operacion', style: 'tableHeader' },
            { text: 'Imagen de Voucher', style: 'tableHeader' },
            { text: 'Modalidad', style: 'tableHeader' },
            { text: 'Aprobacion de voucher', style: 'tableHeader' },
            { text: 'Observacion', style: 'tableHeader' },
          ],
          ...data.map((ed) => {
            return [
              { text: ed.estudiante_id, style: 'tableBody' },
              { text: ed.ciclo_academico_id, style: 'tableBody' },
              { text: ed.especialidad_id, style: 'tableBody' },
              { text: ed.modulo_id, style: 'tableBody' },
              { text: ed.especialidad_modulo_id, style: 'tableBody' },
              { text: ed.pago, style: 'tableBody' },
              { text: ed.importe_pago, style: 'tableBody' },
              { text: ed.voucher_numero_operacion, style: 'tableBody' },
              { text: ed.voucher_img, style: 'tableBody' },
              { text: ed.modalidad, style: 'tableBody' },
              { text: ed.voucher_aprobado, style: 'tableBody' },
              { text: ed.observacion, style: 'tableBody' },
            ];
          }),
        ],
      },
      layout: 'lightHorizontalLines',
    };
  }
  eventExport(params?: Object): void {
    const header = [
      'ESTUDIANTE',
      'CICLO ACADEMICO',
      'ESPECIALIDAD',
      'MODULO',
      'ESPECIALIDAD DE MODULO',
      'PAGO',
      'IMPORTE DE PAGO',
      'NUMERO DE OPERACION',
      'IMAGEN DE VOUCHER',
      'MODALIDAD',
      'VOUCHER APROBADO',
      'OBSERVACION',
    ];
    this.tuitionService.getWithQuery$(params).subscribe(
      (response) => {
        this.tuitions = response.data || [];
        this.excelService.generateExcel(
          'REPORTE DE MATRICULA',
          header,
          this.convertDataToExcel(this.tuitions)
        );
      },
      (error) => {
        this.error = error;
      }
    );
  }

  private convertDataToExcel(data: Tuition[]): any {
    let result: any[] = [];
    data.map((ed) => {
      result.push([
        ed.estudiante_id,
        ed.ciclo_academico_id,
        ed.especialidad_id,
        ed.modulo_id,
        ed.especialidad_modulo_id,
        ed.pago,
        ed.importe_pago,
        ed.voucher_numero_operacion,
        ed.voucher_img,
        ed.modalidad,
        ed.voucher_aprobado,
        ed.observacion,
      ]);
    });
    return result;
  }
}
