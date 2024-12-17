import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { EmployeeService } from '../emp.service';
import { CalendarService } from '../calendar.service';
import { forkJoin, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import '@fontsource/firago/400.css';
import '@fontsource/firago/500.css';
import '@fontsource/firago/600.css';
import '@fontsource/firago/700.css';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(
    public categories: CategoriesService,
    public empServ: EmployeeService,
    private route: Router,
    private calendar : CalendarService
  ) { }

  ngOnInit(): void {
    // console.log("i'm here!")
    this.categories.getCategories().subscribe(resp => {
      this.categories.catList = resp;
    });

    // this.getEmpList();
    // console.log(this.empServ.DoctorsList)
  }

  getEmpList() {
    let id: number = 0;

    if (this.empServ.DoctorsList.length) {
      id = Number(this.empServ.DoctorsList[this.empServ.DoctorsList.length - 1].id)
    } else {
      id = 0
    }

    let newArr = this.empServ.DoctorsList


    this.empServ.get_emp(id).subscribe(resp => {
      // this.empServ.DoctorsList = []
      // this.empServ.DoctorsList.unshift(resp[0])
      for (let res of resp) {
        newArr.push(res);
      }
      console.log(newArr)
    })

  }

  // getEmpList() {
  //   this.empServ.get_emp().subscribe(resp => {
  //     this.empServ.DoctorsList = []
  //     this.empServ.DoctorsList = resp
  //     // console.log(this.empServ.DoctorsList)
  //   })
  // }

  save(category: any) {
    // console.log(`i am filtering... ${category}`)
    if (category === "evryone") {
      this.getEmpList();
      // console.log(this.getEmpList())
    }
    this.empServ.get_doctor_category(category).subscribe(resp => {
      this.empServ.DoctorsList = resp
      // console.log(resp)
      // console.log(this.empServ.DoctorsList)
    })
  }

  routeToBooking(id: any) {
    console.log(id)

    
    this.empServ.update_doctor_view_count(Number(id)).subscribe();
    
    this.empServ.get_emp_by_id(id).subscribe(res => {
      this.empServ.Doctor = res;

      this.calendar.get_doctors_reservations(id).pipe(
        tap(res => {
          this.calendar.reservationList = res
        })
      ).subscribe(() => {
        if(this.calendar.reservationList){
          // console.log(this.calendar.reservationList)
          this.route.navigate(['bookVisit'])
          // this.route.navigate(['bookVisit']);
        }
      });
      // console.log(res)
        // this.route.navigate(['bookVisit', id]);
    })
  }
  revieCounter(star: any) {
    console.log(star)
  }
}
