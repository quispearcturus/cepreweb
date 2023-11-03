import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService, IResponse} from '../../utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RolService extends EntityDataService<IResponse> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.rol);
  }

  public getRolActiveUser$(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-usuario`);
  }

  public getRolByUser$(data: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-usuario/`, {params: data});
  }

  public getRolUser$(data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.endPoint}-usuario`, data);
  }

  public getRolMenu$(data: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-modulo`, {params: data});
  }

  public saveRolMenu$(data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.endPoint}-modulo`, data);
  }
}
