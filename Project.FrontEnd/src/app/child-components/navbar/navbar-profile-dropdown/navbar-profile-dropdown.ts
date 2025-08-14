import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IsLogged } from '../../../core/services/auth/is-logged';


@Component({
  selector: 'app-navbar-profile-dropdown',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-profile-dropdown.html',
  styleUrl: './navbar-profile-dropdown.css'
})
export class NavbarProfileDropdown {
  constructor(public el: ElementRef, private router: Router, private logged: IsLogged) { }      //dropdown link with navbar

  username: any = localStorage.getItem("user_name");
  UserIsLogged = false;

  ngOnInit(): void {
    // Subscribe to changes from service
    this.logged.loggedIn$.subscribe(status => { this.UserIsLogged = status; });
  }

  signout(): void {
    localStorage.clear();
    this.router.navigate([`/welcomepage`])
    this.logged.refreshNav();
  }
}
