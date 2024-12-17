import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  dispState: boolean = true;
  // userExsist: boolean = false;

  constructor(public auth: AuthService, private calendar : CalendarService) { }

  isLocalStorageTokenExsist: boolean = localStorage.getItem("Token") ? true : false;

  ngOnInit(): void {
    
    if (this.isLocalStorageTokenExsist) {
      this.auth.get_auth_user().subscribe(res => {
        this.auth.logged_user = res;
      });
    }


    // console.log("მე უნდა დავუძახო იუზერს")
  }

  displayAuth() {
    this.dispState = !this.dispState
  }

}
