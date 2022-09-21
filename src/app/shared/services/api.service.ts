import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = environment.API_URL;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) {}

  getDataApi(param: string): Observable<any> {
    return this.httpClient
      .get<any>(this.API_URL + param, {
        headers: this.headers,
        responseType: 'json',
      })
      .pipe(catchError(this.errorGetHandler.bind(this)));
  }

  postDataApi(param: string, body: any): Observable<any> {
    return this.httpClient
      .post<any>(this.API_URL + param, body, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  putDataApi(param: string, body: any = null): Observable<any> {
    return this.httpClient
      .put<any>(this.API_URL + param, body)
      .pipe(catchError(this.errorHandler));
  }

  deleteDataApi(param: string): Observable<any> {
    return this.httpClient
      .delete<any>(this.API_URL + param)
      .pipe(catchError(this.errorHandler));
  }

  errorGetHandler(error: HttpErrorResponse) {
    // this.router.navigate(['/not-found']);
    return throwError(error.message || 'Data Not Found');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Data Not Found');
  }
}
