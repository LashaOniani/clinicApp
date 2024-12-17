import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from './Models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  save_user(user: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders()
    };

    return this.http.post<any>("http://localhost:5052/api/User/Save_User", user, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error occurred while saving the user:', error);
          return throwError(() => new Error('Failed to save employee. Please try again later.'));
        })
      );
  }
}
