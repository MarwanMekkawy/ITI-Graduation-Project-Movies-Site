import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5059/api/Users';

  // 🔥 NEW: shared user stream
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, userData: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, userData);
  }

  // 🔥 NEW: set current user (broadcast updated user to all subscribers)
  setUser(user: User) {
    this.userSubject.next(user);
  }
}
