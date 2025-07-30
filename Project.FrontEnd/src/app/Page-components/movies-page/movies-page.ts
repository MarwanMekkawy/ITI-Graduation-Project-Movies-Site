import { Component } from '@angular/core';
import { CarouselComponent } from "../../child-components/carousel/carousel";

@Component({
  selector: 'app-movies-page',
  imports: [CarouselComponent],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.css'
})
export class MoviesPage {

}
