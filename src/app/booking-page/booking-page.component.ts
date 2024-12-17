import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../emp.service';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent {
  constructor(public emp: EmployeeService, private route: Router) { }

  doctorId !: any;

  ngOnInit() {

    if (!this.emp.Doctor.id) {
      this.route.navigate(['']);
    }

    this.doctorId = this.emp.Doctor.id;
    // console.log(this.doctorId)
  }
}
