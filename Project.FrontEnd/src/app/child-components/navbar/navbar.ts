import { UserService } from './../../core/services/user-service';
import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "./navbar-search-bar/search-bar";
import { NavbarProfileDropdown } from "./navbar-profile-dropdown/navbar-profile-dropdown";
import { NavbarGenreDropdown } from "./navbar-genre-dropdown/navbar-genre-dropdown";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../core/models/user';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NavbarProfileDropdown, NavbarGenreDropdown,RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
 ngOnInit(): void {
  this.userService.user$.subscribe(user => {
    if (user) {
      this.user = user;

      // Ensure base64 prefix
      if (user.userImage && !user.userImage.startsWith('data:image')) {
        this.profileImage = `data:image/jpeg;base64,${user.userImage}`;
      } else {
        this.profileImage = user.userImage || '/ProfilePlaceholder.jpg';
      }
    }
  });

  // Load once (e.g., for first load or page refresh)
  this.userService.getUser(this.userId).subscribe(user => {
    this.userService.setUser(user); // trigger initial state
  });
}
  constructor(private userService: UserService) {}

  user: User | null = null;
private userId = 14; // or fetch from auth/session
   profileImage = '/ProfilePlaceholder.jpg';
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
