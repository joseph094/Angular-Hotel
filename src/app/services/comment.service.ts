// comment.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url2 = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  async getComments(): Promise<any> {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${url2}/comments`;
    return this.http.get(url, { headers }).toPromise();
  }

  async createComment(comment: any): Promise<any> {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${url2}/comments`;
    return this.http.post(url, comment, { headers }).toPromise();
  }
}
