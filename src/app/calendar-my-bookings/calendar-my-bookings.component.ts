import { Component, EventEmitter, Input, OnInit, Output, ElementRef, HostListener} from '@angular/core';
import { ReservationModel } from '../Models/ReservationModel';
import { EmployeeService } from '../emp.service';
import { EmployeeModel } from '../Models/EmployeeModel';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CalendarService } from '../calendar.service';


@Component({
  selector: 'app-calendar-my-bookings',
  templateUrl: './calendar-my-bookings.component.html',
  styleUrl: './calendar-my-bookings.component.css'
})
export class CalendarMyBookingsComponent {
  
@Input() visitorStatus ?: string;
@Input() bookingObject !: ReservationModel;
@Input() isEditBtnClicked : boolean = false;
@Input() isDelBtnClicked : boolean = false;
//მოცემული output ფუნქცია გვეხმარება ვაკონტროლოთ მომხმარებელის კლიკი
@Output() closeContainer = new EventEmitter<boolean>();

doctor !: EmployeeModel;
displayState : boolean = false;

constructor(public empService : EmployeeService, private elementRef: ElementRef, private calendarService : CalendarService){}

ngOnInit(){
}

generateObj() {
  this.empService.get_emp_by_emp_id(this.bookingObject.employee_Id).pipe(
    tap(res => {
      this.empService.Doctor = res
    })
  ).subscribe();
}

display(){
  this.generateObj();
  if(this.empService.Doctor){
    this.displayState = !this.displayState
  }
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  if (!this.elementRef.nativeElement.contains(target)) {
    this.displayState = false;
    this.closeContainer.emit(false);
  }
}

updateReservationText(reservationObject : ReservationModel){
  console.log('გავუშვათ აფდეითი: ', reservationObject)
}

deleteReservation(reservationObject : ReservationModel){
  if(reservationObject){
    console.log('ვშლით რეზერვაციას: ', reservationObject)
    this.calendarService.delete_reservation(reservationObject.id, reservationObject.user_Id, reservationObject.employee_Id).subscribe()
  }
}

updateReservationDate(){
  console.log('შევცვალოთ ვიზიტის დრო')
}

}
