import { Injectable } from '@angular/core';
import {
  TransveralApproachDetail
} from "../../../views/dashboard/Setup/transversalAprroach/models/transveral-approach-detail";

@Injectable({
  providedIn: 'root'
})
export class ArrayApproachService {
  transveralApproachDetails: TransveralApproachDetail[] = [];

  agregarValor(valor: TransveralApproachDetail) {
    this.transveralApproachDetails.push(valor);
  }

  obtenerArray(): TransveralApproachDetail[] {
    return this.transveralApproachDetails;
  }
  eliminarValor(index: number) {
    this.transveralApproachDetails.splice(index, 1);
  }
  limpiarArray() {
    this.transveralApproachDetails = [];
  }
}
