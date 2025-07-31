import { Component } from '@angular/core';
import { Footer } from "../../child-components/footer/footer";
import { Navbar } from "../../child-components/navbar/navbar";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  imports: [Footer, Navbar,RouterLink],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css'
})
export class WelcomePage {

}
