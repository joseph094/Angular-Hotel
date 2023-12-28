import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loginData = {
    email: '',
    password: ''
  }
  error = "";
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  async login() {
    this.authservice.LoginUser(this.loginData).subscribe(async (res: any) => {
      // console.log("Welcome My user");
      localStorage.setItem('access_token', res.token);
      const result = await this.authservice.GetProfile();
      localStorage.setItem('role', result.role);

      this.router.navigateByUrl("/profil");

    }, err => {
      console.log(err);
      this.error = "Please Verify your Credentials"

    });
  }
  forgortPassword() {
    this.router.navigate(['/forgot-password']);
  }
  profile() {
    this.authservice.GetProfile().then((res: any) => {
      // console.log("Welcome My user");
      console.log("res", res);

      //this.router.navigateByUrl("/login");

    }, err => {
      console.log(err);
      this.error = "Please Verify your Credentials"

    });
  }
}
