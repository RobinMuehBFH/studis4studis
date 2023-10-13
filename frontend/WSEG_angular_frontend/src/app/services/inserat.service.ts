import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {InseratArrayModel, InseratModel} from '../interfaces/inserat';

@Injectable({
  providedIn: 'root'
})

export class InseratService {
  api_url = "http://localhost:1337/api/";

  // jwt token of user -> only authenticated user can post and put
  /*headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.api_key}`
  });

  requestOptions = { headers: this.headers };*/

  constructor(private http: HttpClient) { }

  public getInserate(): Observable<InseratArrayModel> {
    return this.http.get<InseratArrayModel>(this.api_url+"inserate?populate=*");
  }

  public getInserateById(inseratId: number): Observable<InseratModel> {
    return this.http.get<any>(this.api_url+"inserate/"+inseratId+"?populate[0]=user");
  }

  public addInserat(inserat:any):Observable<InseratArrayModel>{
    return this.http.post<InseratArrayModel>(this.api_url+"inserate", inserat)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public uploadImages(formdata: FormData) {
    return this.http.post(this.api_url+"upload", formdata);
  }

  public deleteInseratById(inseratId: any): Observable<any>{
    return this.http.delete(this.api_url+"inserate/"+inseratId)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public editInserat(updatedInserat: any, inseratId: number) {
    return this.http.put(this.api_url+"inserate/"+inseratId, updatedInserat).pipe(
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
