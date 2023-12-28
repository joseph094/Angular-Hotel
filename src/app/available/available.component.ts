import { Component, OnInit, ViewChild } from '@angular/core';
import { ChambersService } from '../services/chambers.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.scss']
})
export class AvailableComponent implements OnInit {
  RequestChambers = {
    beginDate: '',
    endDate: ''
  };
  chambers: any;
  datasource: any;
  error = '';
  types: any;
  displayedColumns = ["nbr_chamber", "floor", "type", "price_winter", "price_spring", "price_summer", "price_autmn", "caracterstiques", "Reserve Room"]
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  show = false;
  constructor(private chamberService: ChambersService, private router: Router, private datepipe: DatePipe) { }
  selectedValue: string = '';

  // Function to handle selection change

  ngOnInit(): void {
    this.getTypes();
  }

  async getChambers() {

    this.show = false;
    this.error = "";

    if (this.RequestChambers.endDate == "" || this.RequestChambers.endDate == "") {

      this.error = "Fill In the Dates"
      console.log(1);


    }
    else if (!(new Date(this.RequestChambers.beginDate) >= new Date() || new Date(this.RequestChambers.beginDate).toDateString() === new Date().toDateString())) {

      this.error = "The Start Day should be Today or After"
      console.log(2);


    } else if (!(new Date(this.RequestChambers.beginDate) <= new Date(this.RequestChambers.endDate) || new Date(this.RequestChambers.beginDate).toDateString() === new Date(this.RequestChambers.endDate).toDateString())) {
      this.error = "Check The end Day is before the start Day  "
      console.log(3);

    } else {


      const result = await this.chamberService.GetChambersByDate({ beginDate: this.datepipe.transform(new Date(this.RequestChambers.beginDate), 'dd/MM/yyyy'), endDate: this.datepipe.transform(new Date(this.RequestChambers.endDate), 'dd/MM/yyyy') })
      console.log(result);
      this.chambers = result;
      this.show = true;
      this.datasource = new MatTableDataSource(this.chambers)
      setTimeout(() => {
        this.datasource.sort = this.sort;
      })
      setTimeout(() => {
        this.datasource.paginator = this.paginator;
      })
      setTimeout(() => {
        this.datasource.filterPredicate = (data: any, filter: string) => {
          const type = data.categories.type.toLowerCase();
          return type.includes(filter);
        };
      })
      setTimeout(() => {
        this.datasource.sortingDataAccessor = (item: any, property: any) => {
          switch (property) {
            case 'type': return item.categories.type;
            case 'price_winter': return item.categories.price_winter;
            case 'price_spring': return item.categories.price_spring;
            case 'price_summer': return item.categories.price_summer;
            case 'price_autmn': return item.categories.price_autmn;
            case 'caracterstiques': return item.categories.caracterstiques;
            default: return item[property];

          }

        }
      })

    }

  }
  async getTypes() {
    try {
      const result = await this.chamberService.GetChamberTypes();
      this.types = result;
      console.log(this.types);

    } catch (error) {
      console.log(error);

    }
  }
  onSelectionChange(event: any) {
    this.selectedValue = event.target.value;
    this.applyFilter();

  }

  applyFilter() {
    const filterValue = this.selectedValue.trim().toLowerCase();
    this.datasource.filter = filterValue;
  }
  setReservation(chamberId: any, price_winter: any, price_summer: any, price_spring: any, price_autmn: any,) {
    let price = 0;
    const month = new Date(this.RequestChambers.beginDate).getMonth() + 1;
    if (month == 3 || month == 4 || month == 5) {
      price = price_spring;
    } else if (month == 6 || month == 7 || month == 8) {
      price = price_summer;
    } else if (month == 9 || month == 10 || month == 11) {
      price = price_autmn;
    } else {
      price = price_winter
    }

    let data = {
      price:price,
      chamberId: chamberId,
      beginDate: this.datepipe.transform(new Date(this.RequestChambers.beginDate), 'dd/MM/yyyy'),
      endDate: this.datepipe.transform(new Date(this.RequestChambers.endDate), 'dd/MM/yyyy')
    }
    this.chamberService.setReservation(data);
    this.router.navigateByUrl('/reserve');

  }
  reservation(chamberId: any) {
    this.router.navigateByUrl('/reserve');
  }
  


}
