import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url1 = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private http: HttpClient) { }

  async Getcategories(): Promise<any> {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = url1 + "/admin/room-categories";
    return this.http.get(url, { headers }).toPromise();
  }
  async deleteCategorie(categoryId: string): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/room-categories/" + categoryId;
    return this.http.delete(url, { headers }).toPromise();
  }
  async updateCategorie(categoryId: string, categorie: String): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/room-categories/" + categoryId;
    return this.http.put(url, categorie, { headers }).toPromise();
  }
  async GetcategorieByType(categoryId: string): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/room-categories/" + categoryId;
    return this.http.get(url, { headers }).toPromise();

  }
  async CreateCategorie(category: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/room-categories";
    return this.http.post(url, category, { headers }).toPromise();
  }

}
