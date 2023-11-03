import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService, IResponse} from '../../utils';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ManageModuleService extends EntityDataService<IResponse> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.manage_modulo);
  }
  public getByAcademicModuleId$(idAcademicModule:string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-modulo/${idAcademicModule}`);
  }
}
