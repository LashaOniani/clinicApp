import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { EmployeeService } from '../emp.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  constructor(public categories: CategoriesService,
    public empServ: EmployeeService,
  ) { }

  selectedCat : string = 'evryone';
  // კატეგორიები გაგვაქ ცალკე;
  // ვსტილავთ Home Page-ს
  // გადავდივართ რეზერვაცოებზე
  // ვაკეთებთ აუთენთიფიკაციის ვალიდაციებს ბექის მხარეს
  ngOnInit(): void {
    // this.categories.getCategories().subscribe(resp => {
    //   this.categories.catList = resp;
    //   // console.log(resp)
    // });
    this.getEmpList();
  }

  getEmpList() {
    this.empServ.get_emp(0).subscribe(resp => {
      // console.log(resp)
      // this.empServ.DoctorsList = []
      this.empServ.DoctorsList = resp
    })
  }

  filterByCategory(category: any) {
    this.selectedCat = category
    if (category === "evryone") {
      this.getEmpList();
      // console.log(this.getEmpList())
    }else{
      this.empServ.get_doctor_category(category).subscribe(resp => {
        this.empServ.DoctorsList = resp
        // console.log(resp)
        // console.log(this.empServ.DoctorsList)
      })
    }
  }

}
