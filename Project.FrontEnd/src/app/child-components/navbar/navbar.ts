import { UserService } from '../../core/services/auth/user-service';
import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "./navbar-search-bar/search-bar";
import { NavbarProfileDropdown } from "./navbar-profile-dropdown/navbar-profile-dropdown";
import { NavbarGenreDropdown } from "./navbar-genre-dropdown/navbar-genre-dropdown";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { IsLogged } from '../../core/services/auth/is-logged';



@Component({ 
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NavbarProfileDropdown, NavbarGenreDropdown, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  constructor(private userService: UserService, private router: Router, private logged:IsLogged) { }

  UserIsLogged=false;

  ngOnInit(): void {
    // Subscribe to changes from service
    this.logged.loggedIn$.subscribe(status => { this.UserIsLogged = status;});
    
    // Detect route change and hide search bar if navigating to /search
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (event.url.includes('/search')) {
        this.searchVisible = false;
      }
    }
  });
  }

  //dark/light mode switch//
   isDarkMode = true;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
  document.documentElement.style.setProperty("--background-color", "rgb(0, 3, 12)");
  document.documentElement.style.setProperty("--text-color", "rgb(213, 215, 216)");
  document.documentElement.style.setProperty("--gray-color", "rgb(66, 70, 77)");
  document.documentElement.style.setProperty("--dark-gray-color", "rgb(46, 46, 46)");
  document.documentElement.style.setProperty("--footer-gray", "rgb(33, 33, 33)");
  document.documentElement.style.setProperty("--ep-card-grey", "rgb(24, 27, 35)");
  document.documentElement.style.setProperty("--white-color", "rgb(255,255,255)");
  document.documentElement.style.setProperty("--black-color", "rgb(0, 0, 0)");
  document.documentElement.style.setProperty("--white-color-2", "255,255,255");
  document.documentElement.style.setProperty("--black-color-2", "0,0,0");
  document.documentElement.style.setProperty("--active-icon", "rgb(255, 215, 0)");
  document.documentElement.style.setProperty("--non-active-icon", "rgb(226, 226, 226)");
} else {
  document.documentElement.style.setProperty("--background-color", "rgba(233, 233, 233, 1)");
  document.documentElement.style.setProperty("--text-color", "rgb(0, 0, 0)");
  document.documentElement.style.setProperty("--gray-color", "rgb(200, 200, 200)");
  document.documentElement.style.setProperty("--dark-gray-color", "rgb(220, 220, 220)");
  document.documentElement.style.setProperty("--footer-gray", "rgb(240, 240, 240)");
  document.documentElement.style.setProperty("--ep-card-grey", "rgb(228, 228, 228)");
  document.documentElement.style.setProperty("--white-color", "rgb(0,0,0)");
  document.documentElement.style.setProperty("--black-color", "rgb(228, 228, 228)");
  document.documentElement.style.setProperty("--white-color-2", "0,0,0");
  document.documentElement.style.setProperty("--black-color-2", "228, 228, 228");
  document.documentElement.style.setProperty("--active-icon", "rgb(226, 226, 226)");
  document.documentElement.style.setProperty("--non-active-icon", "rgb(255, 215, 0)");
}

  }


  //scroll func./////////////////////////////////////////////////////////////////////////////
  isScrolled = false;
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  //searchbar func./////////////////////////////////////////////////////////////////////////
  searchVisible = false;
  // Gets a reference to the search bar component (to access its native element)
  @ViewChild('searchBarComp') searchBarComp?: SearchBarComponent;
  // Toggles the search bar on/off when button is clicked
  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
  // 🔽 THIS is where the outside click code goes
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.searchVisible || !this.searchBarComp) return;
    const clickedInside = this.searchBarComp.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.searchVisible = false;
    }
  }

  //genre dropdown func.///////////////////////////////////////////////////////////////////
  showDropdown = false;
  private hideTimeout: any;

  onTriggerEnter() {
    // hide search bar
    this.searchVisible = false;

    // hide profile immediately
    this.clearProfileHideTimeout();
    this.showProfileDropdown = false;

    this.clearHideTimeout();
    this.showDropdown = true;
  }

  onTriggerLeave() {
    this.startHideTimeout();
  }

  onDropdownEnter() {
    // hide search bar
    this.searchVisible = false;

    // hide profile immediately
    this.clearProfileHideTimeout();
    this.showProfileDropdown = false;

    this.clearHideTimeout();
  }

  onDropdownLeave() {
    this.startHideTimeout();
  }

  private startHideTimeout() {
    this.hideTimeout = setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  private clearHideTimeout() {
    clearTimeout(this.hideTimeout);
  }
  //profile dropdown func.///////////////////////////////////////////////////////////////////
  showProfileDropdown = false;
  private profileHideTimeout: any;

  onProfileTriggerEnter() {
    // hide search bar
    this.searchVisible = false;

    // hide genre immediately
    this.clearHideTimeout();
    this.showDropdown = false;

    this.clearProfileHideTimeout();
    this.showProfileDropdown = true;
  }

  onProfileTriggerLeave() {
    this.startProfileHideTimeout();
  }

  onProfileDropdownEnter() {
    // hide search bar
    this.searchVisible = false;

    // hide genre immediately
    this.clearHideTimeout();
    this.showDropdown = false;

    this.clearProfileHideTimeout();
  }

  onProfileDropdownLeave() {
    this.startProfileHideTimeout();
  }

  private startProfileHideTimeout() {
    this.profileHideTimeout = setTimeout(() => {
      this.showProfileDropdown = false;
    }, 200);
  }

  private clearProfileHideTimeout() {
    clearTimeout(this.profileHideTimeout);
  }
}
