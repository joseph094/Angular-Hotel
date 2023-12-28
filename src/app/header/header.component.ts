import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  role = "";
  userData: any;

  ngOnInit(): void {
    this.Role();
  }

  LoggedIn() {

    return (!!localStorage.getItem('access_token'))
  }
  Role() {
    if (localStorage.getItem('role') === 'USER') {
      return 'USER'
    } else if (localStorage.getItem('role') === 'ADMIN') {
      return 'ADMIN'
    } else {
      return ''
    }
  }
  async Logout() {
    localStorage.removeItem("role");
    this.router.navigateByUrl("/login");
    return localStorage.removeItem("access_token");
  }


}
