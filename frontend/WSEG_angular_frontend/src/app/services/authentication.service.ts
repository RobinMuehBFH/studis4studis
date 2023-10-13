import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api_url = "http://localhost:1337/api/";
  private currentUserSource = new BehaviorSubject<any | undefined>(undefined);
  private currentUserObservable = this.currentUserSource.asObservable();
  private currentUser: any | undefined;

  constructor(public http: HttpClient) {
    if (sessionStorage.getItem('currentUser') === "undefined" || sessionStorage.getItem('currentUser') === null) {
    }
    else {
      this.currentUserSource.next(JSON.parse(sessionStorage.getItem('currentUser')!));
    }
    this.currentUserObservable.subscribe((user) => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
    });
  }

  public getCurrentUser(){
    return this.currentUser;
  }

  public getUserInformationById(userId: number){
    return this.http.get(this.api_url+"users/"+userId);
  }

  public login(checkoutForm: any){
    return this.http.post(this.api_url+"auth/local", {
      identifier: checkoutForm.value.email,
      password: checkoutForm.value.password
    }).pipe(
      map(user => this.currentUserSource.next(user)),
      catchError(err => this.handleError(err))
    );
  }

  public logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear();
    this.currentUserSource.next(undefined);
  }

  public register(checkoutForm: any){
    return this.http.post(this.api_url+"auth/local/register", {
      username: checkoutForm.value.username,
        email: checkoutForm.value.email,
        password: checkoutForm.value.password,
    }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  public uploadProfilePicutre(formdata: FormData) {
    return this.http.post(this.api_url+"upload", formdata);
  }

  public updateProfilePicture(profilePicturePath: string, userId: number) {
    return this.http.put<any>(this.api_url+"users/"+userId,{
      profilePicturePath: profilePicturePath
    });
  }

  public getAllCurrentUserInformation() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUser.jwt}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.api_url+"users/me",requestOptions );
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
