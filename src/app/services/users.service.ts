import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createUser(user: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = apiUrl + "/admin/users/create";
    return this.http.post<any>(apiUrl, user, { headers }).toPromise();
  }

  getUserById(userId: number): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = apiUrl + "admin/users/find/" + userId
    return this.http.get<any>(url, { headers }).toPromise();
  }

  getAllUsers(): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = apiUrl + "admin/users";
    return this.http.get<any>(url, { headers }).toPromise();
  }

  updateUser(userId: any, updatedUser: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = apiUrl + "admin/users/update/" + userId
    return this.http.put<any>(url, updatedUser, { headers }).toPromise();
  }

  deleteUser(userId: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = apiUrl + "admin/users/delete/" + userId
    return this.http.delete<void>(url, { headers }).toPromise();
  }
  updateUserPassword(userId: any, updatedPasswordUser: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = apiUrl + "auth/users/updatepassword/" + userId
    return this.http.put<any>(url, updatedPasswordUser, { headers }).toPromise();
  }
}
