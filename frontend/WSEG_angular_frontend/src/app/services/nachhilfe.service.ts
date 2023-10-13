import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {NachhilfeModel} from "../interfaces/nachhilfe";

@Injectable({
  providedIn: 'root'
})
export class NachhilfeService {
  api_url = "http://localhost:1337/api/";
  api_key = "6ab33e4562a28763a66d9f46a873f083";
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.api_key}`
  });
  requestOptions = { headers: this.headers };
 

  constructor(public http: HttpClient) { }

  public getNachhilfen(): Observable<NachhilfeModel> {
    return this.http.get<NachhilfeModel>(this.api_url+"nachhilfen");
  }

  public getNachhilfeById(nachhilfeId: number): Observable<any> {
    return this.http.get<any>(this.api_url+"nachhilfen/"+nachhilfeId+"?populate[0]=user");
  }

  public addNachhilfe(nachhilfe:any):Observable<NachhilfeModel>{
    return this.http.post<NachhilfeModel>(this.api_url+"nachhilfen", nachhilfe)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public deleteNachhilfeById(nachhilfeId: number) {
    return this.http.delete(this.api_url+"nachhilfen/"+nachhilfeId)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public uploadImages(formdata: FormData) {
    return this.http.post(this.api_url+"upload", formdata);
  }

  public editNachhilfe(updatedNachhilfe: any, nachhilfeId: number) {
    return this.http.put(this.api_url+"nachhilfen/"+nachhilfeId, updatedNachhilfe).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
