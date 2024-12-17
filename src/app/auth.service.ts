import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './Models/loginModel';
import { catchError, Observable, throwError } from 'rxjs';
import { EmployeeModel } from './Models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser: EmployeeModel = new EmployeeModel();


  constructor(private http: HttpClient) { }

  authenticate(login: Login): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>("http://localhost:5052/api/Auth/Authenticate", login, httpOptions)
      .pipe(
        catchError(error => {
          alert(error.error);
          return throwError(() => new Error(''));
        })
      )
  }

  get_auth_user(): Observable<any> {

    let token = localStorage.getItem("Token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    
    return this.http.get<any>("http://localhost:5052/api/Auth/Get_Auth_Account", httpOptions).pipe(
      catchError(error => {
        if (error.status === 401) {

        } else {
          alert(error.error);
        }
        return throwError(() => new Error('Error occurred while fetching tasks'));
      })
    )
  }

  get logged_user(): EmployeeModel {
    return this.authUser;
  }

  set logged_user(user: EmployeeModel) {
    this.authUser = user;
  }
}
