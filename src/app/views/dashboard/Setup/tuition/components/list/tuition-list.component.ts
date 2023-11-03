import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from 'src/environments/generals';
import {Tuitions} from "../../models/tuitions";


@Component({
  selector: 'app-tuition-list',
  template: `
    <div class="responsive-table">
      <table class="table table-lg table-hover table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">DNI</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Nombres</th>
          <th scope="col">Especialidad</th>
          <th scope="col">Módulo</th>
          <th scope="col">Turno/Hora</th>
          <th scope="col">Sección</th>
          <th scope="col">Observación</th>
          <th scope="col">Fecha Matrícula</th>
          <th scope="col">Tipo Pago</th>
          <th scope="col">Código</th>
          <th scope="col">Voucher</th>
          <th scope="col">Aprobar</th>
          <th scope="col">Obser.</th>
          <th scope="col">Imprimir</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr *ngFor="let o of tuitions ; let i=index">
          <th scope="row">{{i + 1}}</th>
          <td data-title="DNI">{{o.dni}}</td>
          <td data-title="Apellidos">{{o.apellidos}}</td>
          <td data-title="Nombre">{{o.nombres}}</td>
          <td data-title="Especialidad">{{o.especialidad}}</td>
          <td data-title="Modulo">{{o.modulo}}</td>
          <td data-title="Turno">{{o.turno}}: {{o.hora_inicio}} - {{o.hora_fin}}</td>
          <td data-title="Seccion">{{o.seccion}}</td>
          <td data-title="Observacion">{{o.observacion}}</td>
          <td data-title="Matricula">{{o.fecha}}</td>
          <td data-title="Tipo Pago">{{o.pago}}</td>
          <td data-title="Codigo">{{o.codigo}}</td>
          <td data-title="Voucher">
            <button type="button" class="btn-gm-sm btn btn-primary btn-gm-small"
                    title="Ver Imagen" (click)="goViewImage(o.id!)">
              <span class="{{ abcForms.btnIMG.icon }}"></span>
            </button>
          </td>
          <td data-title="Aprobar">
            <button type="button" class="btn-gm-sm btn btn-secondary" (click)="goEditApprovedVoucher(o.id!)">
              <span
                class="badge text-bg-{{
                          o.voucher_aprobado ? 'success' : 'danger'
                        }} text-white"
              >
                        {{ o.voucher_aprobado ? 'APROBADO' : 'APROBAR' }}
                      </span>
            </button>

          </td>
          <td data-title="observación">
            <button type="button" class="btn-gm-sm btn btn-dark btn-gm-small"
                    title="Ver Imagen" (click)="goEditComments(o.id!)">
              <span class="{{ abcForms.btnFile.icon }}"></span>
            </button>
          </td>
          <td data-title="Imprimir">
            <button type="button" class="btn-gm-sm btn btn-secondary btn-gm-small"
                    title="{{ abcForms.btnEdit.label }}" (click)="goPrint(o.id!)">
              <span class="{{ abcForms.btnPrint.icon }}"></span>
            </button>
          </td>
          <td data-title="Acciones">
            <button type="button" class="btn-gm-sm btn btn-warning btn-gm-small"
                    title="{{ abcForms.btnEdit.label }}" (click)="goEdit(o.id!)">
              <span class="{{ abcForms.btnEdit.icon }}"></span>
            </button>
            <button type="button" class="btn-gm-sm btn btn-danger text-white btn-gm-small"
                    title="{{ abcForms.btnDelete.label }}" (click)="goDelete(o.id!)">
              <span class="{{ abcForms.btnDelete.icon }}"></span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
})

export class TuitionListComponent implements OnInit {
  abcForms: any;
  @Input() tuitions: Tuitions[] = [];
  @Output() eventEdit = new EventEmitter<number>();

  @Output() eventDelete = new EventEmitter<number>();
  @Output() eventPrint = new EventEmitter<number>();
  @Output() eventViewImage = new EventEmitter<number>();
  @Output() eventEditComments = new EventEmitter<number>();
  @Output() eventEditApprovedVoucher = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    this.abcForms = abcForms;
  }

  public goEdit(id: number): void {
    this.eventEdit.emit(id);
    alert(id)
  }

  public goDelete(id: number): void {
    this.eventDelete.emit(id);
  }
  public goPrint(id: number): void {
    this.eventPrint.emit(id);
  }
  public goViewImage(id: number): void {
    this.eventViewImage.emit(id);
  }
  public goEditComments(id: number): void {
    this.eventEditComments.emit(id);
  }
  public goEditApprovedVoucher(id: number): void {
    this.eventEditApprovedVoucher.emit(id);
  }
}
