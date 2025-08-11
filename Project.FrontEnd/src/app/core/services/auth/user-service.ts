import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UpdateRequest } from '../../models/update-request';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5059/api/Users';

  // 🔥 NEW: shared user stream
  private userSubject = new BehaviorSubject<UpdateRequest | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<UpdateRequest> {
    return this.http.get<UpdateRequest>(`${this.baseUrl}/${id}`);
  }

  // 🔥 NEW: set current user (broadcast updated user to all subscribers)
  setUser(user: UpdateRequest) {
    this.userSubject.next(user);
  }
}
