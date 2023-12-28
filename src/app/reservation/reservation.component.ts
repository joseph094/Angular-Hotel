import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ChambersService } from '../services/chambers.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  profileData: any;
  chamber: any;
  details: any;
  price: any;
  FromDate: any;
  ToDate: any;

  constructor(private authservice: AuthService, private router: Router, private chamberService: ChambersService) { }


  ngOnInit(): void {
    this.getProfileData();
    this.getChamberDetail();
    this.details = this.chamberService.getReservation();
    this.price = this.chamberService.getDaysDifference(this.details.beginDate, this.details.endDate) * this.details.price;
    this.FromDate = new Date(this.details.beginDate)
    this.ToDate = new Date(this.details.endDate)
    console.log("dates", this.chamber);




  }

  async getProfileData() {

    this.profileData = await this.authservice.GetProfile();
  }
  async getChamberDetail() {
    var details = this.chamberService.getReservation();
    this.chamber = await this.chamberService.GetChamberById(details.chamberId)
    console.log(this.chamber);



  }
  reserve() {
    const isConfirmed = confirm('Are you sure you want to confirm this reservation?');

    if (isConfirmed) {
      this.chamberService.ReserveChamber({ chamberId: this.details.chamberId, userId: this.profileData.id_user, beginDate: this.details.beginDate, endDate: this.details.endDate,full_price:this.price }).then(() => {
        // Refresh the page after deletion
        this.router.navigateByUrl(`/profil`)

      }).catch(error => {
        console.error('Error Creating Reservation:', error);
      });
    }
  }

}
