import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReservationModel } from './Models/ReservationModel';


@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  private reservations : any = [];
  private baseUrl = "http://localhost:5052/api/"
  
  constructor(private http: HttpClient) { }


  add_User_Reservation(reservation : any): Observable<any>{

    let token = localStorage.getItem("Token")
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<any>(`${this.baseUrl}Reservation/Add_Reservation`, reservation, httpOptions)
  }

  get_User_Reservation_List(): Observable<ReservationModel[]> {
    let token = localStorage.getItem("Token")
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<ReservationModel[]>(`${this.baseUrl}Reservation/Get_User_Reservation_List`, httpOptions)
  }

  get_doctors_reservations(id : any): Observable<ReservationModel[]> {
    let token = localStorage.getItem("Token")
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<ReservationModel[]>(`${this.baseUrl}Reservation/Get_doctors_reservations?id=${id}`, httpOptions)
  }

  delete_reservation(reservation_id : number, user_id : number, employee_id : number): Observable<any> {
    let token = localStorage.getItem("Token")
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.delete<any>(`${this.baseUrl}Reservation/Delete_reservation?reservation_id=${reservation_id}&user_id=${user_id}&employee_id=${employee_id}`, httpOptions)
  }

  get reservationList() : any {   
    // console.log(this.reservations)
    return this.reservations;
  }
  
  set reservationList(reservationList : any) {
    this.reservations = reservationList;
  }
}
