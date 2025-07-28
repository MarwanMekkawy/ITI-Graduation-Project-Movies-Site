import { Component } from '@angular/core';
import { SlideShow } from "../../child-components/slide-show/slide-show";
import { CarouselComponent } from "../../child-components/carousel/carousel";

@Component({
  selector: 'app-home-page',
  imports: [SlideShow, CarouselComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
