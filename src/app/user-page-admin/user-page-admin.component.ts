import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page-admin',
  templateUrl: './user-page-admin.component.html',
  styleUrl: './user-page-admin.component.css'
})
export class UserPageAdminComponent {

  pageToLoad: string = '';

  changeActiveCategory(event: any) {
    // console.log(event.target.textContent)
    this.pageToLoad = event.target.textContent;

  }

}
