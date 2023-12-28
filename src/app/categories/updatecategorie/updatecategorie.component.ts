import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-updatecategorie',
  templateUrl: './updatecategorie.component.html',
  styleUrls: ['./updatecategorie.component.scss']
})
export class UpdatecategorieComponent implements OnInit {
  type = this.router.url.split("/")[2];
  Category = {
    type: '',
    price_winter: 0,
    price_autmn: 0,
    price_summer: 0,
    price_spring: 0,
    caracterstiques: ''
  };
  cat: any;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategorie();
  }
  async loadCategorie() {
    try {
      const result = await this.categoriesService.GetcategorieByType(this.type);
      this.cat = result;
      console.log(this.Category);
      this.Category.caracterstiques = this.cat.caracterstiques;
      this.Category.price_spring = this.cat.price_spring;
      this.Category.price_summer = this.cat.price_summer;
      this.Category.price_autmn = this.cat.price_autmn;
      this.Category.price_winter = this.cat.price_winter;
      this.Category.type = this.cat.type;

    } catch (error) {
      console.log({ error });
    }

  }
  updateCategory(categoryId: string, Category: any): void {
    // Use a basic JavaScript confirm dialog
    const isConfirmed = confirm('Are you sure you want to update this category?');

    if (isConfirmed) {
      console.log(this.fieldsNotEmpty());


      if (!this.fieldsNotEmpty()) {
        const isConfirmed = confirm('Check there are some empty FIELDS');

      } else {
        // User clicked "OK" in the confirm dialog
        this.categoriesService.updateCategorie(categoryId, Category).then(() => {
          // Refresh the page after deletion
          this.router.navigateByUrl(`/categories`)

        }).catch(error => {
          console.error('Error Updating category:', error);
        });
      }
    }
  }
  fieldsNotEmpty(): boolean {
    // Add your validation logic here
    return (
      this.Category.type.trim() !== '' &&
      this.Category.price_winter !== null &&
      this.Category.price_spring !== null &&
      this.Category.price_summer !== null &&
      this.Category.price_autmn !== null &&
      this.Category.caracterstiques.trim() !== ''
    );
  }
}
