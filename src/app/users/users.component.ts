import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource: any;
  users: any;
  displayedColumns = ["first_name", "last_name", "phone", "email", "password", "edit", "delete"]
  show = false;
  User = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: ""
  };
  types: any;
  error = '';
  constructor(private userService: UsersService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {

    this.loadusers();
  }

  async loadusers() {
    try {
      const result = await this.userService.getAllUsers();
      this.users = result;

      if (this.users !== undefined) {
        this.datasource = new MatTableDataSource(this.users);
        console.log(this.datasource.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        //  console.log("coucou",this.lender)
      }

    } catch (error) {
      console.log({ error });
    }

  }

  deleteUser(userId: any): void {
    // Use a basic JavaScript confirm dialog
    const isConfirmed = confirm('By Deleting this User you will Delete every associated reservations !! Are You Sure ?');

    if (isConfirmed) {

      // User clicked "OK" in the confirm dialog
      this.userService.deleteUser(userId).then(() => {
        // Refresh the page after deletion
        this.loadusers();
      }).catch(error => {
        console.error('Error deleting User:', error);
      });
    }
  }
  updateUser(userId: any) {
    this.router.navigateByUrl(`/users/${userId}`)
  }
  showOrNot() {
    this.show = !this.show;
  }
  registerUser() {
    if (this.User.first_name.length < 3 || this.User.last_name.length < 3) {
      this.error = "first Name and last name should be longer than 3 caracters"
    } else if (!/\d/.test(this.User.phone)) {
      this.error = "Phone should contain numbers";
    } else if (this.User.password.length < 6) {
      this.error = "password should be longer than 6  caracters";
    } else {
      this.authservice.RegisterUser(this.User).subscribe((res: HttpResponse<any>) => {

        if (res.body.statusCodeValue === 201) {
          console.log("Successfully connected", res);
          this.loadusers();
          this.show = false;
          this.setFieldsempty();

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
  setFieldsempty() {
    this.User.first_name = "";
    this.User.last_name = "";
    this.User.password = "";
    this.User.email = "";
    this.User.phone = ""
  }
}
