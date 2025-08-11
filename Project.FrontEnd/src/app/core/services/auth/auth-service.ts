import { AuthResponse } from './../../models/auth-response';
import { LoginRequest } from './../../models/login-request';
import { UpdateRequest } from './../../models/update-request';
import { RegisterRequest } from './../../models/register-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5059/api/Users';

  constructor(private httpClient: HttpClient) { }

  sendRegisterForm(data: RegisterRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/signup`, data);
  }

  sendLoginForm(data: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  sendUpdateForm(id: number, userData: UpdateRequest): Observable<AuthResponse> {
    return this.httpClient.put<AuthResponse>(`${this.baseUrl}/${id}`, userData);
  }
}