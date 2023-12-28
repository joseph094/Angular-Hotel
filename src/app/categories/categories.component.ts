import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})



export class CategoriesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource: any;
  categories: any;
  displayedColumns = ["type", "price_winter", "price_spring", "price_summer", "price_autmn", "caracterstiques", "edit", "delete"]
  Category = {
    type: '',
    price_winter: 0,
    price_autmn: 0,
    price_summer: 0,
    price_spring: 0,
    caracterstiques: ''
  };
  show = false;
  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {

    this.loadCategories();

  }

  async loadCategories() {
    try {
      const result = await this.categoriesService.Getcategories();
      this.categories = result;

      if (this.categories !== undefined) {
        this.datasource = new MatTableDataSource(this.categories);
        console.log(this.datasource.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        //  console.log("coucou",this.lender)
      }

    } catch (error) {
      console.log({ error });
    }

  }

  deleteCategory(categoryId: string): void {
    // Use a basic JavaScript confirm dialog
    const isConfirmed = confirm('Are you sure you want to delete this category?');

    if (isConfirmed) {
      // User clicked "OK" in the confirm dialog
      this.categoriesService.deleteCategorie(categoryId).then(() => {
        // Refresh the page after deletion
        this.loadCategories();
      }).catch(error => {
        console.error('Error deleting category:', error);
      });
    }
  }
  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`/categorie/${categoryId}`)
  }
  showOrNot() {
    this.show = !this.show;
  }
  createCategory(): void {
    // Use a basic JavaScript confirm dialog

    console.log(this.fieldsNotEmpty());


    if (!this.fieldsNotEmpty()) {
      const isConfirmed = confirm('Check there are some empty FIELDS');

    } else {
      // User clicked "OK" in the confirm dialog
      this.categoriesService.CreateCategorie(this.Category).then(() => {
        // Refresh the page after deletion
        this.loadCategories();
        this.setFieldsEmpty();
        this.show = false;

      }).catch(error => {
        console.error('Error Creating Category:', error);
      });
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
  setFieldsEmpty() {
    this.Category.type = '',
      this.Category.price_winter = 0,
      this.Category.price_autmn = 0,
      this.Category.price_summer = 0,
      this.Category.price_spring = 0,
      this.Category.caracterstiques = ''

  }
}
