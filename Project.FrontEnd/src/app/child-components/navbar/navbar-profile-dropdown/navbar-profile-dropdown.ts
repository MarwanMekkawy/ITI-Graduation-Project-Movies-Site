import { CommonModule } from '@angular/common';
import { Component ,ElementRef} from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar-profile-dropdown',
 imports: [CommonModule,RouterLink],
  templateUrl: './navbar-profile-dropdown.html',
  styleUrl: './navbar-profile-dropdown.css'
})
export class NavbarProfileDropdown {
constructor(public el: ElementRef) {}      //dropdown link with navbar
}
