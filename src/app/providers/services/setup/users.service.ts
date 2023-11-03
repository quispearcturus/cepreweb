import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService, IResponse} from '../../utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService extends EntityDataService<IResponse> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.users);
  }

  public getMenuPadre$(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-rol`);
  }

  public getUserConected$(data?: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-conectado`, {params: data});
  }

  public deleteUserConected$(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}-conectado/${id}`);
  }

  public deleteAllUserConected$(): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}-conectado`);
  }

  public getUserRolById$(id: string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-rol/${id}`);
  }

  public saveUsuarioRol$(data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.endPoint}-rol`, data);
  }

  public saveUsuarioState$(data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.endPoint}-activar`, data);
  }

}
