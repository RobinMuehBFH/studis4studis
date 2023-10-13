import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  api_url = "http://localhost:1337/api/";

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable<any> {
    return this.http.get<any>(this.api_url+"questions?populate[answers][populate][0]=user&populate=user")
      .pipe(
      catchError(err => this.handleError(err))
    );
  }

  public addQuestion(question: any){
    return this.http.post<any>(this.api_url+"questions",question)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  public addAnswer(answer: any){
    return this.http.post<any>(this.api_url+"answers",answer)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  public deleteQuestionById(questionId: any): Observable<any>{
    return this.http.delete(this.api_url+"questions/"+questionId)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public deleteAnswerById(answerId: any): Observable<any>{
    return this.http.delete(this.api_url+"answers/"+answerId)
      .pipe(
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
