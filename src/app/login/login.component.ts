import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(): void {
    console.log(this.loginForm.value)
    this.auth.authenticate(this.loginForm.value).subscribe(res => {
      // console.log(res.accessToken);
      // console.log(res)
      localStorage.setItem("Token", res.accessToken);
      let date = new Date();
      let dateString = date.toUTCString();
      localStorage.setItem("TokenAddDate", dateString);
      this.router.navigate([''])
      location.reload();
    });
  }


}
