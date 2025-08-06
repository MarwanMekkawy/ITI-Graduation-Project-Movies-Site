import { Movie } from '../../core/models/movie';
import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
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
export class MovieCard implements OnDestroy {
  @Input() movie!: Movie;
  @Output() remove = new EventEmitter<number>(); // ✅ Emit when removed

  private overlayRef: OverlayRef | null = null;
  private overlayCreated = false;
  private isCardHovered = false;
  private isOverlayHovered = false;

  constructor(
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  @HostListener('mouseenter')
  onCardEnter(): void {
    this.isCardHovered = true;
    if (!this.isFullyVisible()) return;
    if (!this.overlayCreated) {
      this.showPreview();
    }
  }

  @HostListener('mouseleave')
  onCardLeave(): void {
    this.isCardHovered = false;
    this.tryHideOverlay();
  }

  private isFullyVisible(): boolean {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const container = this.findScrollParent(this.elementRef.nativeElement);
    const containerRect = container?.getBoundingClientRect();

    if (!containerRect) return false;

    return (
      rect.top >= containerRect.top &&
      rect.bottom <= containerRect.bottom &&
      rect.left >= containerRect.left &&
      rect.right <= containerRect.right
    );
  }

  private findScrollParent(element: HTMLElement): HTMLElement | null {
    let parent: HTMLElement | null = element.parentElement;

    while (parent) {
      const styles = window.getComputedStyle(parent);
      const isScrollableY = ['auto', 'scroll'].includes(styles.overflowY);
      const isScrollableX = ['auto', 'scroll'].includes(styles.overflowX);

      if (isScrollableY || isScrollableX) return parent;
      parent = parent.parentElement;
    }

    return null;
  }

  private showPreview(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'top'
        }
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

    // ✅ Forward hover events
    componentRef.instance.mouseEntered.subscribe(() => {
      this.isOverlayHovered = true;
    });

    componentRef.instance.mouseLeft.subscribe(() => {
      this.isOverlayHovered = false;
      this.tryHideOverlay();
    });

    // ✅ Forward removal event
    componentRef.instance.removed.subscribe((movieId: number) => {
      this.remove.emit(movieId);
    });

    this.overlayCreated = true;
  }

  private tryHideOverlay(): void {
    setTimeout(() => {
      if (!this.isCardHovered && !this.isOverlayHovered) {
        this.hideOverlay();
      }
    }, 80);
  }

  private hideOverlay(): void {
    try {
      if (this.overlayRef?.hasAttached()) {
        this.overlayRef.detach();
      }
      this.overlayRef?.dispose();
      this.overlayRef = null;
      this.overlayCreated = false;
    } catch (error) {
      console.warn('Error disposing overlay:', error);
    }
  }

  ngOnDestroy(): void {
    this.hideOverlay();
  }
}
