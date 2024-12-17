import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../emp.service';

@Component({
  selector: 'app-user-page-admin-categories',
  templateUrl: './user-page-admin-categories.component.html',
  styleUrl: './user-page-admin-categories.component.css'
})
export class UserPageAdminCategoriesComponent {

  constructor(public emps: EmployeeService) {
    console.log(emps.DoctorsList)
  }

  ngOnInit() {
    this.emps.get_all_emp().subscribe(res => this.emps.DoctorsList = res)
  }

  editInfo(): void {
    console.log("მე ვარედაქტირებ")
  }


  deleteEmp(): void {
    console.log("მე ვშლი")
  }
}
