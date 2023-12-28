import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChambersService } from 'src/app/services/chambers.service';

@Component({
  selector: 'app-updateroom',
  templateUrl: './updateroom.component.html',
  styleUrls: ['./updateroom.component.scss']
})
export class UpdateroomComponent {
  chamberId = this.router.url.split("/")[2];
  Chamber = {
    nbr_chamber: 0,
    floor: 0,
    categories: ""
  };
  cat: any;
  types: any;
  selectedValue: string = '';

  constructor(
    private chamberService: ChambersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategorie();
    this.getTypes();
  }
  async loadCategorie() {
    try {
      const result = await this.chamberService.GetChamberById(this.chamberId);
      this.cat = result;
      console.log(this.cat);
      this.Chamber.nbr_chamber = this.cat.nbr_chamber;
      this.Chamber.floor = this.cat.floor;
      this.Chamber.categories = this.cat.categories.type;
      console.log(this.Chamber);
      


    } catch (error) {
      console.log({ error });
    }

  }
  updateChamber(chamberId: string, Chamberupdated: any): void {
    // Use a basic JavaScript confirm dialog
    const isConfirmed = confirm('Are you sure you want to update this Chamber?');

    if (isConfirmed) {
      console.log(this.fieldsNotEmpty());


      if (!this.fieldsNotEmpty()) {
        const isConfirmed = confirm('Check there are some empty FIELDS');

      } else {
        // User clicked "OK" in the confirm dialog
        this.chamberService.updateChamber(chamberId, Chamberupdated).then(() => {
          // Refresh the page after deletion
          this.router.navigateByUrl(`/rooms`)

        }).catch(error => {
          console.error('Error Updating category:', error);
        });
      }
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
  async getTypes() {
    try {
      const result = await this.chamberService.GetChamberTypes();
      this.types = result;
      console.log(this.types);

    } catch (error) {
      console.log(error);

    }
  }
}



