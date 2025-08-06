import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { send } from 'process';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`http://localhost:5059/api/Users/signup`, data);
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`http://localhost:5059/api/Users/login`, data);
  }
}
