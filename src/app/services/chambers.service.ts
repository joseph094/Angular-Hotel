import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url1 = "http://localhost:8080/api/v1"


@Injectable({
  providedIn: 'root'
})
export class ChambersService {
  private reservation: any;
  constructor(private http: HttpClient) { }
  async Getchambers(): Promise<any> {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = url1 + "/chambers/rooms";
    return this.http.get(url, { headers }).toPromise();
  }
  async deleteChamber(chamberId: string): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/chambers/" + chamberId;
    return this.http.delete(url, { headers }).toPromise();
  }
  async updateChamber(chamberId: string, chamber: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/chambers/" + chamberId;
    return this.http.put(url, chamber, { headers }).toPromise();
  }
  async createChamber(chamber: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/admin/chambers/rooms";
    return this.http.post(url, chamber, { headers }).toPromise();
  }
  async GetChamberById(chamberId: string): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/chambers/" + chamberId;
    return this.http.get(url, { headers }).toPromise();
  }
  async GetChambersByDate(dates: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/chambers/available";
    return this.http.post(url, dates, { headers }).toPromise();
  }
  async GetChamberTypes(): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/chambers/types";
    return this.http.get(url, { headers }).toPromise();
  }
  getReservation() {
    return this.reservation;
  }
  setReservation(reser: any) {
    this.reservation = reser;
  }
  getDaysDifference(startDate: string, endDate: string): number {
    const [dayStart, monthStart, yearStart] = startDate.split('/').map(Number);
    const [dayEnd, monthEnd, yearEnd] = endDate.split('/').map(Number);

    const startDateObject = new Date(yearStart, monthStart - 1, dayStart);
    const endDateObject = new Date(yearEnd, monthEnd - 1, dayEnd);

    const timeDifference = endDateObject.getTime() - startDateObject.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }
  async GetReservationsByUser(userId:any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/user/reservations/"+userId;
    return this.http.get(url, { headers }).toPromise();
  }
  async GetReservationsByChamber(chamberId:any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/chamber/reservations/"+chamberId;
    return this.http.get(url, { headers }).toPromise();
  }
  async ReserveChamber(requestreserve: any): Promise<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = url1 + "/reservations";
    return this.http.post(url, requestreserve, { headers }).toPromise();
  }
  async GetReservations(): Promise<any> {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = url1 + "/admin/reservations";
    return this.http.get(url, { headers }).toPromise();
  }
  
}
