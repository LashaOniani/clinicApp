import { Injectable } from '@angular/core';
import { EmployeeModel } from './Models/EmployeeModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, empty, Observable, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private doctors: EmployeeModel[] = [];
    private doctor: EmployeeModel = new EmployeeModel();

    constructor(private http: HttpClient) { }

    private baseUrl: string = "http://localhost:5052/api"


    //ინახავს ექიმს
    save_emp(user: any): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders()
        };

        return this.http.post<any>("http://localhost:5052/api/Employee/Save_Employee", user, httpOptions)
            .pipe(
                catchError((error) => {
                    // console.error('ხარვეზია, სცადე მოგვიანებით ', error);
                    return throwError(() => new Error('ხარვეზია, სცადე მოგვიანებით'));
                })
            );
    }

    // მიბრუნებს ყველა ექიმს
    get_all_emp(): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders()
        }
        return this.http.get<EmployeeModel[]>(`${this.baseUrl}/Employee/Get_Employees`, httpOptions).pipe(
            catchError(error => {
                if (error.status === 401) {
                    // this.router.navigate(['./login']);
                } else {
                    alert(error.error);
                }
                return throwError(() => new Error('Error occurred while fetching tasks'));
            })
        );
    }

    // ფუნქცია ფლიტრია ეძებს ექიმს სახელით
    get_doctor_by_name(fullname: string): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders()
        }

        return this.http.get<EmployeeModel[]>(`${this.baseUrl}/Employee/Get_Employee_By_Full_Name?fullname=${encodeURIComponent(fullname)}`, httpOptions).pipe(
            catchError(error => {
                if (error.status === 401) {
                    // this.router.navigate(['./login']);
                } else {
                    alert(error.error);
                }
                return throwError(() => new Error('ხარვეზია, სცადე მოგვიანებით'));
            })
        )
    }
    // ფუნქცია ფილტრია ეძებს ექიმს კატეგორიით
    get_doctor_category(category: string): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders()
        }

        return this.http.get<EmployeeModel[]>(`${this.baseUrl}/Employee/Get_Employee_By_Category?category=${encodeURIComponent(category)}`, httpOptions).pipe(
            catchError(error => {
                if (error.status === 401) {
                    // this.router.navigate(['./login']);
                } else {
                    alert(error.error);
                }
                return throwError(() => new Error('ხარვეზია, სცადე მოგვიანებით'));
            })
        )
    }

    // ფუნქცია ეძებს თანმშრომელს back ის მხარეს მონაცემთა ბაზაში person_id ით
    get_emp_by_id(id: number): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders()
        }

        return this.http.get<EmployeeModel[]>(`${this.baseUrl}/Employee/Get_Employee_By_Id?id=${encodeURIComponent(id)}`, httpOptions).pipe(
            catchError(error => {
                if (error.status === 401) {

                } else {
                    alert(error.error);
                }
                return throwError(() => new Error('ხარვეზია, სცადე მოგვიანებით'));
            })
        )
    }

    // ფუნქციას უნდა გადაეცეს back ის მხარეს მონაცემთა ბაზის emp id
    // აბრუნებს თანამშრომელს
    get_emp_by_emp_id(id: number): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders()
        }

        return this.http.get<EmployeeModel[]>(`${this.baseUrl}/Employee/Get_Employee_By_Emp_Id?id=${encodeURIComponent(id)}`, httpOptions).pipe(
            catchError(error => {
                if (error.status === 401) {

                } else {
                    alert(error.error);
                }
                return throwError(() => new Error('ხარვეზია, სცადე მოგვიანებით'));
            })
        )
    }

    // ფუნქცია აბრუნებს მთავარ გვერდზე პირველ და მომდევნო ექვს ექიმს
    get_emp(id: number): Observable<any> {
        
        let httpOptions = {
            headers: new HttpHeaders()
        }

        return this.http.get<EmployeeModel[]>(`${this.baseUrl}/Employee/Get_First_Nine?id=${encodeURIComponent(id)}`, httpOptions).pipe(
            catchError(error => {
                if (error.status === 401) {

                } else {
                    alert(error.error);
                }
                return throwError(() => new Error('ხარვეზია, სცადე მოგვიანებით'));
            })
        )
    }

    // მოცემული ფუნქცია ექიმის ნახვებს ზრდის
    update_doctor_view_count(id: number): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.put<any>(`${this.baseUrl}/Employee/Update_View_Count?id=${id}`, null, httpOptions);
    }

    // get_authorized_emp()

    get DoctorsList(): EmployeeModel[] {
        return this.doctors;
    }
    set DoctorsList(list: EmployeeModel[]) {
        this.doctors = list;
    }

    get Doctor(): EmployeeModel {
        return this.doctor
    }

    set Doctor(doc: EmployeeModel) {
        this.doctor = doc
    }

}
