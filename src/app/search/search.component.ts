import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../emp.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public emps: EmployeeService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      fullname: ['', [Validators.required]],
      speciality: ['', [Validators.required]]
    });
  }

  searchByFullName(): void {
    const fullname = this.searchForm.value.fullname;

    if (fullname) {
      this.emps.get_doctor_by_name(fullname).subscribe(
        res => {
          console.clear();
          this.emps.DoctorsList = res; // Update the list
          console.log('Search Results by Full Name:', this.emps.DoctorsList);

          // Notify Angular about the change
          this.cdr.detectChanges();
        },
        err => console.error('Error fetching doctors by name:', err)
      );
    }
  }

  searchByCategory(): void {
    const speciality = this.searchForm.value.speciality;

    if (speciality) {
      this.emps.get_doctor_category(speciality).subscribe(
        res => {
          console.clear();
          this.emps.DoctorsList = res; // Update the list
          console.log('Search Results by Category:', this.emps.DoctorsList);

          // Notify Angular about the change
          this.cdr.detectChanges();
        },
        err => console.error('Error fetching doctors by category:', err)
      );
    }
  }
}
