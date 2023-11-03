import { Component, OnInit,Input } from '@angular/core';
import { abcForms } from 'src/environments/generals';
import { ConfirmDialogService } from "../../../../../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { AssistanceService } from "../../../../../../providers/services";
import { Assistance } from "../../models/assistance";
import { faCheck, faTimes, faClock } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-assistance-new',
  template: `
    <div class="responsive-table">
      <table class="table table-lg table-hover table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Apellidos y nombres</th>
          <th scope="col">Asistencia</th>
          <th scope="col">Tardanzas</th>
          <th scope="col">Inasistencias</th>
          <th scope="col">Estado</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr *ngFor="let o of assistances ; let i=index">
          <th scope="row">{{i + 1}}</th>
          <td data-title="nombres">{{o.apellido_pa}} {{o.apellido_ma}} {{o.nombres}}</td>
          <td data-title="asistencias">{{o.asistencia}}</td>
          <td data-title="tardanzas">{{o.tardanza}}</td>
          <td data-title="inasistencias">{{o.inasistencia}}</td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <span class="fa-stack fa-lg icono-estado mr-2" [ngClass]="{'seleccionado': estadoPorDefecto === o.estado}" (click)="onIconoClick(o)">
                <i *ngIf="o.estado === 'F' || (!o.estado && estadoPorDefecto === 'F')" class="fa fa-times-circle fa-stack-1x text-danger"></i>
                <i *ngIf="o.estado === 'T' || (!o.estado && estadoPorDefecto === 'T')" class="fa fa-clock-o fa-stack-1x text-warning"></i>
                <i *ngIf="o.estado === 'A' || (!o.estado && estadoPorDefecto === 'A')" class="fa fa-check-circle fa-stack-1x text-success"></i>
              </span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12 d-flex justify-content-center align-items-end mb-3">
      <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()">
            <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
      </button>
    </div>
  `,
})
export class AssistanceNewComponent implements OnInit {
  abcForms: any;
  showNav = false;
  public error: string = '';
  @Input() assistances: Assistance[] = [];
  iconos: { nombre: string, icono: IconDefinition }[] = [
    { nombre: 'T', icono: faClock },
    { nombre: 'F', icono: faTimes },
    { nombre: 'A', icono: faCheck }
  ];
  states: string[] = this.iconos.map(i => i.nombre);
  estadoPorDefecto: string = 'A';

  constructor(
    private assistanceService: AssistanceService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.abcForms = abcForms;
    this.assistances.forEach(a => a.estado = 'A');
  }

  onIconoClick(asistencia: Assistance) {
    const index = this.states.indexOf(asistencia.estado ?? '');
    const siguienteIndex = (index + 1) % this.states.length;
    const estado = (this.states[siguienteIndex] || 'A');
    asistencia.estado = estado;
  }

  public saveForm(): void {
    this.confirmDialogService.confirmSave().then(() => {
      const assistancesToSave: Assistance[] = this.assistances.map(assistance => {
        const updatedAssistance = { ...assistance };
        updatedAssistance.estado = assistance.estado ?? this.estadoPorDefecto;
        return updatedAssistance;
      });
      this.assistanceService.add$(assistancesToSave).subscribe(
        response => {
          location.reload();
          this.router.navigate(['./'], { relativeTo: this.route });
        },
        error => {
          this.error = error;
        }
      );
    }).catch(() => {});
  }
}
