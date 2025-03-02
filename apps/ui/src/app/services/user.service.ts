import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllUser(limit: number = 10, offset: number = 0): Observable<any> {
    const token = localStorage.getItem('BestToken');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { limit: limit.toString(), offset: offset.toString() };

    return this.http.get(`${this.baseApiUrl}/users`, {
      headers,
      params
    });
  }


}

