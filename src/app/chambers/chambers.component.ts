import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChambersService } from '../services/chambers.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chambers',
  templateUrl: './chambers.component.html',
  styleUrls: ['./chambers.component.scss']
})
export class ChambersComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource: any;
  chambers: any;
  displayedColumns = ["nbr_chamber", "floor", "type", "price_winter", "price_summer","price_spring","price_autmn","caracterstiques","Check Calender"]
  show = false;
  Chamber = {
    nbr_chamber: 0,
    floor: 0,
    categories: ""
  };
  constructor(private chamberService: ChambersService, private router: Router) { }

  ngOnInit(): void {

    this.loadchambers();
  }

  async loadchambers() {
    try {
      const result = await this.chamberService.Getchambers();
      this.chambers = result;

      if (this.chambers !== undefined) {
        this.datasource = new MatTableDataSource(this.chambers);
        console.log(this.datasource.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        //  console.log("coucou",this.lender)
      }

    } catch (error) {
      console.log({ error });
    }

  }
  check(chamberId:any){
    this.router.navigateByUrl(`calender/chambers/${chamberId}`)
  }

}
