import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChambersService } from '../services/chambers.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource: any;
  chambers: any;
  displayedColumns = ["nbr_chamber", "floor", "type", "edit", "delete"]
  show = false;
  Chamber = {
    nbr_chamber: 0,
    floor: 0,
    categories: ""
  };
  types: any;
  constructor(private chamberService: ChambersService, private router: Router) { }

  ngOnInit(): void {

    this.loadchambers();
    this.getTypes();
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

  deleteChamber(chamberId: string): void {
    // Use a basic JavaScript confirm dialog
    const isConfirmed = confirm('By Deleting this Chamber you will Delete every associated reservations !! Are You Sure ?');

    if (isConfirmed) {

      // User clicked "OK" in the confirm dialog
      this.chamberService.deleteChamber(chamberId).then(() => {
        // Refresh the page after deletion
        this.loadchambers();
      }).catch(error => {
        console.error('Error deleting Chamber:', error);
      });
    }
  }
  updateChamber(chamberId: string) {
    this.router.navigateByUrl(`/rooms/${chamberId}`)
  }
  showOrNot() {
    this.show = !this.show;
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
  CreateChamber(): void {
    if (!this.fieldsNotEmpty()) {
      const isConfirmed = confirm('Check there are some empty FIELDS');

    } else {
      this.chamberService.createChamber(this.Chamber).then(() => {
        this.loadchambers();
        console.log("creating");
        
        this.SetFieldsEmpty();
        this.show = false;

      }).catch(error => {
        console.error('Error Updating category:', error);
      });
    }
  }
  fieldsNotEmpty(): boolean {
    // Add your validation logic here
    return (
      this.Chamber.categories.trim() !== '' &&
      this.Chamber.nbr_chamber !== null &&
      this.Chamber.floor !== null
    )
  }
  SetFieldsEmpty() {
    this.Chamber.categories = "";
    this.Chamber.floor = 0;
    this.Chamber.nbr_chamber = 0;
  }

}
