import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/payemi'; // Your API endpoint


  constructor(private http: HttpClient) {}

  makePayment(emiId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${emiId}`);

  }
}
