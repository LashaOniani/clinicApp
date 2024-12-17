import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingDateModel } from '../Models/BookingDateModel';
import { AuthService } from '../auth.service';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-booking',
  templateUrl: './calendar-booking.component.html',
  styleUrl: './calendar-booking.component.css'
})

export class CalendarBookingComponent {

  display: boolean = false;
  bookingForm: FormGroup;

  @Input() authorized !: boolean;
  @Input() doctor !: any;
  @Input() data !: BookingDateModel;
  @Input() hour !: number;
  @Input() btnState !: boolean;
  @Output() notifyStatus = new EventEmitter<any>()
  
  constructor(private fb: FormBuilder,
    private user : AuthService,
    private calendar : CalendarService
  ) {
    this.bookingForm = this.fb.group({
      description: ['', Validators.required]
    })
  }
  
  changeDisplayState() {
    this.display = !this.display
    this.notifyStatus.emit(this.display)
  }

  save(val: any) {
    let year = this.data.wholeDate.getFullYear();
    let month = this.data.wholeDate.getMonth() + 1;
    let day = this.data.wholeDate.getDate();

    let tempDate = new Date(`${year}-${month}-${day}`)
    tempDate.setHours(this.hour+4)

    console.log(tempDate)
    if(this.authorized){
      let tempObJ = {
        employee_Id: this.doctor,
        user_Id: this.user.logged_user.id,
        start_Date: tempDate,
        reservation_Description: val.description
      }

      this.calendar.add_User_Reservation(tempObJ).subscribe()
      // console.log(tempObJ)
      this.changeDisplayState();
    }
  }
}
