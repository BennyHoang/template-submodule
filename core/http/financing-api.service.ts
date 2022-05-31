import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, share } from 'rxjs/operators';
import {
  ICreateEndpointsRequest,
  IDeleteEndpointsRequest,
  IEndpoints,
  IUpdateEndpointsRequest,
} from 'src/app/models/endpoints';

@Injectable({
  providedIn: 'root',
})
export class FinancingApiService {
  apiURL = environment.FINANCING_CORE_HOST;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getConfigData(): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/services/services-api/frontend_config`
    );
  }

  getEndpoints(): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/services/services-api/endpoints`
    );
  }

  updateEndpoint(request: IUpdateEndpointsRequest): Observable<any> {
    return this.http.post<IUpdateEndpointsRequest[]>(
      `${this.apiURL}/services/services-api/update`,
      request
    );
  }

  createEndpoint(request: ICreateEndpointsRequest): Observable<any> {
    return this.http.post<ICreateEndpointsRequest[]>(
      `${this.apiURL}/services/services-api/create`,
      request
    );
  }
  deleteEndpoint(request: IDeleteEndpointsRequest): Observable<any> {
    return this.http.post<IDeleteEndpointsRequest[]>(
      `${this.apiURL}/services/services-api/delete`,
      request
    );
  }

  getEndpointData(url: string): Observable<any> {
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        if (error.status === 302) {
          return this.http.get<any[]>(error.error);
        }
        return throwError(() => error);
      })
    );
  }
  getLogs(date: string) {
    return this.http.get<any[]>(
      `${this.apiURL}/services/services-api/logs/${date}`
    );
  }

  getAllNotifications(): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/services/notifications-api/notifications/all`
    );
  }

  postEndpointData(url: string, request: any): Observable<any> {
    return this.http.post<any[]>(url, request, this.httpOptions);
  }

  handleError(response: any) {
    if (response.status === 302) {
      console.log('yay 😎');
    }
  }
}
