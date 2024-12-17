import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-page-user',
  templateUrl: './user-page-user.component.html',
  styleUrl: './user-page-user.component.css'
})
export class UserPageUserComponent {

  @Input() viewToShow !: string;
  @Input() role !: string; // აქ მოდის როლი ვინ იძახებს მოცემულ კომპონენტს

  constructor(public auth : AuthService){}
  
  ngOnInit(){
  }
}
