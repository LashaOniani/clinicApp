import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  signUpForm: FormGroup;
  selectedPicture: File | null = null;

  constructor(private fb: FormBuilder, private UserService : UsersService) {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      id_card: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role_id: [4],
      password: ['', [Validators.required]]
    })
  }

  onPictureSelected(event: any) {
    this.selectedPicture = event.target.files[0];
  }

  save(): void {
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

    if (this.selectedPicture) {
      formData.append('picture', this.selectedPicture, this.selectedPicture.name);
    }

    this.UserService.save_user(formData).subscribe(response => {
      console.log('Employee added successfully', response);
    }, error => {
      console.error('Error adding employee', error);
    });
  }
}
