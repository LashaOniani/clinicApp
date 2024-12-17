import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { EmployeeService } from '../emp.service';
import { EmployeeModel } from '../Models/EmployeeModel';

@Component({
  selector: 'app-user-page-admin-emp-reg',
  templateUrl: './user-page-admin-emp-reg.component.html',
  styleUrl: './user-page-admin-emp-reg.component.css'
})
export class UserPageAdminEmpRegComponent {
  signUpForm: FormGroup;
  isEmployee: boolean = false;
  selectedPicture: File | null = null;
  selectedCv: File | null = null;

  constructor(private fb: FormBuilder,
    public categories: CategoriesService,
    private cdRef: ChangeDetectorRef,
    private registrationService: EmployeeService) {

    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      id_card: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role_id: ['', Validators.required],
      password: ['', [Validators.required]],
      category_id: [0],
    })
  }

  onPictureSelected(event: any) {
    this.selectedPicture = event.target.files[0];
  }

  onCvSelected(event: any) {
    this.selectedCv = event.target.files[0];
  }

  public save(): void {
    const formData: FormData = new FormData();

    formData.append('First_Name', this.signUpForm.get('first_name')?.value);
    formData.append('Last_Name', this.signUpForm.get('last_name')?.value);
    formData.append('Birthday', this.signUpForm.get('birthday')?.value);
    formData.append('Gender', this.signUpForm.get('gender')?.value);
    formData.append('Id_card', this.signUpForm.get('id_card')?.value);
    formData.append('Email', this.signUpForm.get('email')?.value);
    formData.append('Phone', this.signUpForm.get('phone')?.value);
    formData.append('Role_id', this.signUpForm.get('role_id')?.value);
    formData.append('Password', this.signUpForm.get('password')?.value);


    formData.append('category_id', this.signUpForm.get('category_id')?.value.toString());

    if (this.selectedPicture) {
      formData.append('picture', this.selectedPicture, this.selectedPicture.name);
    }
    if (this.selectedCv) {
      formData.append('cv', this.selectedCv, this.selectedCv.name);
    }

    this.signUpForm.reset();
    this.registrationService.save_emp(formData).subscribe(response => {
      console.log('Employee added successfully', response);
    }, error => {
      console.error('Error adding employee', error);
    });
  }

  onRoleChange(event: any) {
    this.isEmployee = event.target.value === '4';
    this.requestCategories();
    this.cdRef.detectChanges();
  }

  public requestCategories() {
    this.categories.getCategories().subscribe(resp => {
      this.categories.catList = resp;
    });
  }
}
