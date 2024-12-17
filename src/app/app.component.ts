import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private route: Router) { }

  ngOnInit(): void {

    let addedDateString = localStorage.getItem("TokenAddDate");

    if (addedDateString) {
      let addDate = new Date(addedDateString);
      let today = new Date();

      // მილისეკუნდებში დააბრუნებს
      let differenceTime = today.getTime() - addDate.getTime(); 

      let diffMinutes = differenceTime / 60000;

      if (diffMinutes >= 10) {
        localStorage.clear();
        this.route.navigate(['']);
      }
    }

    // let addedDate = Date.parse(addedDateString)

    // let date = new Date();
    // if(addedDateString)
    // localStorage.clear();

  }
}
