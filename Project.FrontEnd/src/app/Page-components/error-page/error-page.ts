import {Component,ElementRef,OnInit,Renderer2,ViewChild,} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.css'],
})
export class ErrorPage implements OnInit {
  Error_variable = '404';
  @ViewChild('big404', { static: true }) big404Ref!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 40;
      const y = (event.clientY / window.innerHeight - 0.5) * 40;

      this.renderer.setStyle(
        this.big404Ref.nativeElement,
        'transform',
        `translateY(-50%) rotateX(${y}deg) rotateY(${x}deg)`
      );
    });
  }
}
