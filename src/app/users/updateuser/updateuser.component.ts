import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent {
  userId = this.router.url.split("/")[2];
  User = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: ""
  };
  newpasswordupdate = {
    email: this.User.email,
    newpassword: ""
  }
  CNP = "";
  error = "";
  cat: any;
  types: any;
  selectedValue: string = '';

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }
  async loadUser() {
    try {
      const result = await this.userService.getUserById(parseInt(this.userId));
      this.cat = result;
      console.log(this.cat);
      this.User.first_name = this.cat.first_name;
      this.User.last_name = this.cat.last_name;
      this.User.phone = this.cat.phone;
      this.User.email = this.cat.email;
      this.User.password = this.cat.password;

   

    } catch (error) {
      console.log({ error });
    }

  }
  UpdateUser(userId: any, UpdatedUser: any): void {
    // Use a basic JavaScript confirm dialog
    const isConfirmed = confirm('Are you sure you want to update this User?');

    if (isConfirmed) {
      console.log(this.fieldsNotEmpty());


      if (!this.fieldsNotEmpty()) {
        const isConfirmed = confirm('Check there are some empty FIELDS');

      } else {
        // User clicked "OK" in the confirm dialog
        this.userService.updateUser(userId, UpdatedUser).then(() => {
          // Refresh the page after deletion
          this.router.navigateByUrl(`/users`)

        }).catch(error => {
          console.error('Error Updating User:', error);
        });
      }
    }
  }
  fieldsNotEmpty(): boolean {
    // Add your validation logic here
    return (
      this.User.first_name.trim() !== '' &&
      this.User.last_name.trim() !== '' &&

      this.User.phone.trim() !== '' &&
      this.User.email.trim() !== '' &&
      this.User.password.trim() !== ''


    )
  }
  onCopy(event: ClipboardEvent): void {
    // Prevent the default copy behavior
    event.preventDefault();
  }

  onPaste(event: ClipboardEvent): void {
    // Prevent the default paste behavior
    event.preventDefault();
  }
  UpdatePassword() {
    if (this.newpasswordupdate.newpassword !== this.CNP) {

      this.error = "Passwords are Not compatible"
    } else if (this.newpasswordupdate.newpassword.length < 6) {
      this.error = "Password should be longer than 6 caracters"
    } else {
      console.log({ email: this.User.email, newpassword: this.newpasswordupdate.newpassword });
      const isConfirmed = confirm('Are you sure you want to change this User Password?');

      if (isConfirmed) {


      } else {
        // User clicked "OK" in the confirm dialog
        let user=parseInt(this.userId)
        this.userService.updateUserPassword(this.userId, { email: this.User.email, newpassword: this.newpasswordupdate.newpassword }).then(() => {
          console.log(user,"updated");
          
          this.router.navigateByUrl(`/users`)

        }).catch(error => {
          console.error('Error Updating User:', error);
        });
      }
    }
  }

  // Add any other logic you need for handling disabled copy and paste



}

