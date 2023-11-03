
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService, IResponse} from '../../utils';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AcademicModuleService extends EntityDataService<IResponse> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.academic_module);
  }
  public getTypeProgram$(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`tipo-programa`);
  }
  public getBySpecialtieId$(idSpecialtie:string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-especialidad/${idSpecialtie}`);
  }
}
