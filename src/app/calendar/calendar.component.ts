import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BookingDateModel } from '../Models/BookingDateModel';
import { CalendarService } from '../calendar.service';
import '@fontsource/firago/400.css';
import '@fontsource/firago/500.css';
import '@fontsource/firago/600.css';
import '@fontsource/firago/700.css';
import { ReservationModel } from '../Models/ReservationModel';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  @Input() doctorId !: any;
  @Input() visitorStatus !: any;

  newBtnState: boolean = false;
  isAuthorized: boolean = localStorage.getItem("Token") ? true : false;
  responseArray : any[] = [];

  isEditBtnClicked : boolean = false;
  isDelBtnClicked : boolean = false;

  time = new Date();
  year = this.time.getFullYear();
  month = this.time.getMonth();

  delReservationBtnState : boolean = false;
  editReservationBtnState: boolean = false;

  monthsGeorgianAnotation: string[] = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
  daysGeorgianAnotation: string[] = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
  workingHours: number[] = [9, 10, 11, 12, 13, 14, 15, 16]
  
  sevenDayArr: BookingDateModel[] = []

  yearToDisplay : number = this.sevenDayArr.length ? this.sevenDayArr[0].wholeDate.getFullYear() : 0;
  monthToDisplay : string = this.sevenDayArr.length ? this.monthsGeorgianAnotation[this.sevenDayArr[0].wholeDate.getMonth()] : '';

  constructor(public calendar : CalendarService){}

  ngOnInit(){
    if(this.visitorStatus){
      this.calendar.get_User_Reservation_List().subscribe((res:any) => {
        this.responseArray = res
        this.calendar.reservationList = this.responseArray
        this.someFunction();
        console.log(this.calendar.reservationList)
      })
    }else{
      if(this.calendar.reservationList){
        // this.calendar.get_doctors_reservations()
        this.responseArray = this.calendar.reservationList
        this.someFunction();
      }
      // console.log(this.calendar.reservationList)
    }
    // console.log(this.responseArray)
  }

  someFunction(){
    this.sevenDayArr = this.getSevenDayArray();
    this.yearToDisplay = this.sevenDayArr[0].wholeDate.getFullYear()
    this.monthToDisplay = this.monthsGeorgianAnotation[this.sevenDayArr[0].wholeDate.getMonth()]
  }

  getSevenDayArray(date?: Date) {

    let tempArr: BookingDateModel[] = []
    // console.log(date ? date : 'ara')
    for (let i = 0; i < 7; i++) {
      const tempDate = date ? new Date(`${date}`) : new Date();
      tempDate.setDate(tempDate.getDate() + i);
      // console.log(tempDate)
      tempArr.push({
        id: tempDate.getDate(),
        day: this.daysGeorgianAnotation[tempDate.getDay()],
        wholeDate: tempDate,
        description: '',
        isReserved: this.isReserved(tempDate),
        reservations: this.arrayOfReservations(tempDate)
      })
    }
    this.yearToDisplay = tempArr[0].wholeDate.getFullYear();
    this.monthToDisplay = this.monthsGeorgianAnotation[tempArr[0].wholeDate.getMonth()]

    console.log(tempArr)
    return tempArr
  }

  plusSevenDay() {
    let tempArr : BookingDateModel[] = []
    let lastWeekDay = this.sevenDayArr[this.sevenDayArr.length - 1].wholeDate

    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(`${lastWeekDay}`)
      const tempDay = tempDate.getDate() + 1
      tempDate.setDate(tempDay + i)
      tempArr.push({
        id: tempDate.getDate(),
        day: this.daysGeorgianAnotation[tempDate.getDay()],
        wholeDate: tempDate,
        description: '',
        isReserved: this.isReserved(tempDate),
        reservations: this.arrayOfReservations(tempDate)

      })
    }
    this.sevenDayArr = tempArr
    if (tempArr[0].wholeDate.getDate() >= this.time.getDate() && tempArr[0].wholeDate.getMonth() >= this.month && tempArr[0].wholeDate.getFullYear() >= this.year) {
      this.newBtnState = false
    }
  }

  minusSevenDay() {
    let tempArr : BookingDateModel[] = []
    let firstWeekDay = this.sevenDayArr[0].wholeDate

    for (let i = 1; i < 8; i++) {
      const tempDate = new Date(`${firstWeekDay}`)
      tempDate.setDate(tempDate.getDate() - i)
      tempArr.unshift({
        id: tempDate.getDate(),
        day: this.daysGeorgianAnotation[tempDate.getDay()],
        wholeDate: tempDate,
        description: '',
        isReserved: this.isReserved(tempDate),
        reservations : this.arrayOfReservations(tempDate)
      })
    }
    this.sevenDayArr = tempArr

    if (tempArr[0].wholeDate.getFullYear() <= this.year && tempArr[0].wholeDate.getMonth() < this.month) {
      this.newBtnState = true
    } else {
      this.newBtnState = false
    }

    console.log(this.sevenDayArr)
  }

  getNextMonth() {
    let oldDate: any = this.sevenDayArr[0].wholeDate

    let day = oldDate.getDate();
    let month = oldDate.getMonth() + 1;
    let year = oldDate.getFullYear();

    if (month === 12) {
      year = year + 1
      month = 1
    } else {
      month++
    }
    let newDate = new Date(`${year}-${month}-${day}`);

    if (year >= this.year && month >= (this.month + 1)) {
      if (month >= (this.month + 1) && day >= this.time.getDate()) {
        this.newBtnState = false
      } else {
        this.newBtnState = true
      }
    }

    this.sevenDayArr = this.getSevenDayArray(newDate)
    // console.log(this.doctorId)
  }

  getPervMonth() {
    let oldDate: any = this.sevenDayArr[0].wholeDate
    let day = oldDate.getDate();
    let month = oldDate.getMonth() + 1;
    let year = oldDate.getFullYear();

    if (month === 1) {
      month = 12;
      year--
    } else {
      month--
    }
    let newDate = new Date(`${year}-${month}-${day}`)

    if (year < this.year || month < this.month + 1) {
      this.newBtnState = true
    }

    this.sevenDayArr = this.getSevenDayArray(newDate)
    // console.log(newDate)
  }

  addBooking(hour: number, day: BookingDateModel) {
    const tempDate = day.wholeDate
    tempDate?.setHours(hour, 0, 0, 0)
  }



  // ფუნქცია მიბრუნებს გახსნილი აქვს თუ არა იუზერს
  // დაჯავშნის ფანჯარა პარამეტრში მოდის 
  // გახსნილის შემთხვევაში - ture ველიუ
  // დაკეტილის შემთხვევაში - false ვალიუ
  handleStatus($event: any) {
    this.newBtnState = $event
    console.log($event)
    if (!localStorage.getItem("Token")) {
      this.isAuthorized = false;
    }

    return $event
  }

  handleStatusHelperBtns($event : any){
    // console.log($event)
    this.delReservationBtnState = $event.delBtnState ? true : false
    this.editReservationBtnState = $event.editBtnState ? true : false

    // console.log({delReservationBtnState: this.delReservationBtnState,  editReservationBtnState: this.editReservationBtnState})
  }

  isReserved(date ?: Date){
    if (!this.responseArray || !date) {
      return false;
    }
    // console.log(this.responseArray)
    return this.responseArray.some(
      (eachDate : ReservationModel) => {
        let tempDate = new Date(eachDate.start_Date);
        if(tempDate.getFullYear() === date.getFullYear() && tempDate.getMonth() === date.getMonth() && tempDate.getDate() === date.getDate()){

        }
        return tempDate.getFullYear() === date.getFullYear() && tempDate.getMonth() === date.getMonth() && tempDate.getDate() === date.getDate() ? true : false
      }
    );
  }

  arrayOfReservations(date : Date) : ReservationModel[] {

    let fileteredArray = this.responseArray.filter((eachItem : ReservationModel) => {
      let tempDate = new Date(eachItem.start_Date)
      return tempDate.getFullYear() === date.getFullYear() && tempDate.getMonth() === date.getMonth() && tempDate.getDate() === date.getDate()? eachItem : null
    })

    return fileteredArray.map(eachItem => {
      let tempDate = new Date(eachItem.start_Date)
      return {...eachItem, start_Date: tempDate}
    })
  }


  deleteUserReservation(reservation_id : number, user_id : number, employee_id : number){
    // console.log("რეზერვაციის აიდი: ", reservation_id)
    // console.log("მომხმარებლის აიდი: ", user_id)
    // console.log("დოქტორის აიდი: ", employee_id)
    this.calendar.delete_reservation(reservation_id, user_id, employee_id).subscribe();
  }

  isReservationAvailable(day: any, hour: number): boolean {
    let tempRes = day.reservations || [];
    
    return !tempRes.some((reservation: any) => {
      const startDate = new Date(reservation.start_Date);
      return startDate.getHours() === hour;
    });
  }

// ფუნქცია აბრუნებს bolleanს false მშნიშვნელობას თუ
// პირველი პარამეტრი - თარიღი მეტია ან ტოლი მეორე პარამეტრზე
  compareDates(firstDate : Date, secondDate : Date){
    let firtTempDate = firstDate
    firtTempDate.setHours(0)
    firtTempDate.setMinutes(0)
    firtTempDate.setSeconds(0)
    firtTempDate.setMilliseconds(0)

    let secondTempDate = secondDate
    secondTempDate.setHours(0)
    secondTempDate.setMinutes(0)
    secondTempDate.setSeconds(0)
    secondTempDate.setMilliseconds(0)

    if(firtTempDate.getTime() >= secondTempDate.getTime()){
      return true
    }else{
      return false
    }
  }
  
}
