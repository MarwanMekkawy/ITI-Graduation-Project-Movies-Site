import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLogged {
  // BehaviorSubject makes it reactive
  private loggedInSource = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSource.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  refreshNav() {
    this.loggedInSource.next(this.hasToken());
  }
}