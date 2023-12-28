import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ChambersService } from '../services/chambers.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-adminreservations',
  templateUrl: './adminreservations.component.html',
  styleUrls: ['./adminreservations.component.scss']
})
export class AdminreservationsComponent implements OnInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ["nbr_chamber", "type","full_price", "beginDate", "endDate","first_name","last_name","email","status"]
  reservations:any;
  datasource:any;
  constructor(private authService: AuthService, private router: Router, private chamberService: ChambersService) { }

  ngOnInit(): void {
      this.loadCategories();
  }
  async loadCategories() {
    try {
      const result = await this.chamberService.GetReservations();
      this.reservations = result;

      if (this.reservations !== undefined) {
        this.datasource = new MatTableDataSource(this.reservations);
        console.log(this.datasource.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        //  console.log("coucou",this.lender)
      }

    } catch (error) {
      console.log({ error });
    }

  }
  isDateBeforeToday(dateString: string): boolean {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < currentDate;
  }


}
