import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private baseApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('BestToken');
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllProducts(limit: number = 10, offset: number = 0): Observable<any> {
    const headers = this.getHeaders();
    const params = { limit: limit.toString(), offset: offset.toString() };
    return this.http.get(`${this.baseApiUrl}/products`, { headers, params });
  }

  createProduct(productData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseApiUrl}/products/create`, productData, { headers });
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseApiUrl}/products/update/${productId}`, productData, { headers });
  }

  deleteProduct(productId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseApiUrl}/products/delete/${productId}`, { headers });
  }

  getLandingPageProducts(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/products/landingpage`);
  }
}

