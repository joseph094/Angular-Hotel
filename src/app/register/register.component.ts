import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  repeatPass: string = 'none';
  constructor(private authService: AuthService, private router: Router) { }
  registerUserData = {
    first_name: '',
    last_name: 'Nfts',
    email: '',
    password: '',
    phone: '',
    confirmPassword: ""
  }
  error = "";
  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern('^[0-9]*$'),
    ]),
    confirmPassword: new FormControl(''),
  });

  registerSubmited() {
    if (this.PWD.value == this.RPWD.value) {
      this.registerUserData = {
        first_name: this.registerForm.value.firstName || '',
        last_name: this.registerForm.value.lastName || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        phone: this.registerForm.value.phone || '',
        confirmPassword: this.registerForm.value.confirmPassword || '',
      };

      this.registerUser();

    } else {
      this.repeatPass = 'inline';
    }
  }
  registerUser() {
    this.registerUserData = {
      first_name: this.registerForm.value.firstName || '',
      last_name: this.registerForm.value.lastName || '',
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      phone: this.registerForm.value.phone || '',
      confirmPassword: this.registerForm.value.confirmPassword || '',
    };
    if (this.registerUserData.first_name.length < 3 || this.registerUserData.last_name.length < 3) {
      this.error = "first Name and last name should be longer than 3 caracters"
    } else if (!/\d/.test(this.registerUserData.phone)) {
      this.error = "Phone should contain numbers";
    } else if (this.registerUserData.password.length < 6) {
      this.error = "password should be longer than 6  caracters";
    } else {
      this.authService.RegisterUser(this.registerUserData).subscribe((res: HttpResponse<any>) => {

        if (res.body.statusCodeValue === 201) {
          console.log("Successfully connected", res);
          this.router.navigateByUrl("login")
          // Handle success, e.g., redirect to another page
        } else {
          console.error("Unexpected response status", res);
          this.error = res.body.body;
          // Handle unexpected status code
        }

      }, (err) => {
        console.log(err);

      }
      );


    }
  }



  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get phone(): FormControl {
    return this.registerForm.get('phone') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}

