import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

const url1 = "http://localhost:8080/api/v1"


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  //appel à l' Api de l'inscription
  RegisterUser(user: any): Observable<HttpResponse<any>> {
    const url = url1 + "/auth/signup";
    return this.http.post(url, user, { observe: 'response' });
  }
  async GetProfile(): Promise<any> {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = url1 + "/auth/profil";
    return this.http.get(url, { headers }).toPromise();
  }
  updateUser(user: any) {
    const url = url1 + "/update_user_password";
    return this.http.post<any>(url, user);
  }

  //appel à l'Api de a connexion
  LoginUser(logindata: any) {
    const url = url1 + "/auth/signin";
    return this.http.post<any>(url, logindata)
  }
  //Number of Logouts
  LogOutCount(email: any) {
    const url = url1 + "/logout";
    return this.http.post<any>(url, email)

  }
  //Vérifier si l'utilisateur est connecté
  LoggedIn() {
    return (!!localStorage.getItem('access_token'))
  }
  // Déconnexion
  LogoutUser() {
    return localStorage.removeItem('access_token');
  }
  //Récuperation de token
  gettoken() {
    return localStorage.getItem('access_token')
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
