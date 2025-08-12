import { Movie } from '../../core/models/movie';
import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder
} from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { HoverPreview } from './../hover-preview/hover-preview';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
  imports: []
})
export class MovieCard implements OnInit, OnDestroy {
  @Input() movie!: Movie;
  @Output() remove = new EventEmitter<number>();

  private overlayRef: OverlayRef | null = null;
  private overlayCreated = false;
  private isCardHovered = false;
  private isOverlayHovered = false;

  // 🚫 Hover allowed only if card is (almost) fully inside the carousel viewport
  private io?: IntersectionObserver;
  private isInViewport = false; // updated by IntersectionObserver

  constructor(
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    const root = this.findClipOrScrollParent(this.elementRef.nativeElement);
    this.io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        // require ~fully visible to avoid right-edge/next-page hovers
        this.isInViewport = e.intersectionRatio >= 0.98;
      },
      {
        root: root ?? null,         // carousel viewport (or viewport if none)
        threshold: [0, 0.5, 0.98, 1]
      }
    );
    this.io.observe(this.elementRef.nativeElement);
  }

  @HostListener('mouseenter')
  onCardEnter(): void {
    this.isCardHovered = true;
    if (!this.isInViewport) return;          // ⛔ block if clipped/off-page
    if (!this.overlayCreated) this.showPreview();
  }

  @HostListener('mouseleave')
  onCardLeave(): void {
    this.isCardHovered = false;
    this.tryHideOverlay();
  }

  private findClipOrScrollParent(el: HTMLElement): HTMLElement | null {
    let p: HTMLElement | null = el.parentElement;
    while (p) {
      const s = window.getComputedStyle(p);
      // treat any non-visible overflow as a clipping/viewport container
      const clipX = ['auto', 'scroll', 'hidden', 'clip'].includes(s.overflowX);
      const clipY = ['auto', 'scroll', 'hidden', 'clip'].includes(s.overflowY);
      if (clipX || clipY) return p;
      p = p.parentElement;
    }
    return null;
  }

  private showPreview(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'top' } // single position
      ])
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      panelClass: 'hover-overlay-panel'
    });

    const portal = new ComponentPortal(HoverPreview);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.movie = this.movie;

    queueMicrotask(() => this.overlayRef?.updatePosition());

    componentRef.instance.mouseEntered.subscribe(() => (this.isOverlayHovered = true));
    componentRef.instance.mouseLeft.subscribe(() => {
      this.isOverlayHovered = false;
      this.tryHideOverlay();
    });

    componentRef.instance.removed.subscribe((movieId: number) => this.remove.emit(movieId));

    this.overlayCreated = true;
  }

  private tryHideOverlay(): void {
    setTimeout(() => {
      if (!this.isCardHovered && !this.isOverlayHovered) this.hideOverlay();
    }, 150);
  }

  private hideOverlay(): void {
    try {
      if (this.overlayRef?.hasAttached()) this.overlayRef.detach();
      this.overlayRef?.dispose();
    } finally {
      this.overlayRef = null;
      this.overlayCreated = false;
    }
  }

  ngOnDestroy(): void {
    this.hideOverlay();
    this.io?.disconnect();
  }
}
