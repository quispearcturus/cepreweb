import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService, IResponse} from '../../utils';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UbigeoService extends EntityDataService<IResponse> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.ubigeo);
  }
  public getUbigeoDepartment$(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-departamento`);
  }
  public getUbigeoProvince$(id: string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-provincia/${id}`);
  }
  public getUbigeoDistric$(id: string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}-distrito/${id}`);
  }
}
