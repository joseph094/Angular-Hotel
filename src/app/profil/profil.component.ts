import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ChambersService } from '../services/chambers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  repeatPass: string = 'none';
  profileData: any = {};
  user!: any
  reservations: any;
  datasource: any;
  displayedColumns = ["nbr_chamber", "type", "beginDate", "endDate","full_price"]

  constructor(private authService: AuthService, private router: Router, private chamberService: ChambersService) { }
  updatePasswordData = {
    password: '',
    email: '',
  }
  userData = {
    id_user: 0,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: ""
  }

  ngOnInit(): void {
    this.getProfileData();

  }
  ngAfterViewInit(): void {


  }


  updatePasswordForm = new FormGroup({

    password: new FormControl('', [
      //Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // confirmPassword: new FormControl(''),
  });


  async getProfileData() {
    try {

      const result = await this.authService.GetProfile();
      this.userData = result;
      const res = await this.Getreservations(this.userData.id_user);
      console.log(res);
      
    } catch (error) {
      console.log({ error });
    }

    console.log(this.profileData);


  }
  async Getreservations(userId: any) {
    this.reservations = await this.chamberService.GetReservationsByUser(userId);
    if (this.reservations !== undefined) {
      this.datasource = new MatTableDataSource(this.reservations);
      console.log("res",this.datasource);
      
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      //  console.log("coucou",this.lender)
    }


  }

  saveNewPssword() {


  }
  formulaire() {
    console.log(this.profileData);

  }
  get Email(): FormControl {
    return this.updatePasswordForm.get('email') as FormControl;
  }
  get NPWD(): FormControl {
    return this.updatePasswordForm.get('password') as FormControl;
  }

  // get RPWD(): FormControl {
  //   return this.updatePasswordForm.get('confirmPassword') as FormControl;
  // }

}
