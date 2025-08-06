import { Movie } from './../../core/models/movie.interface';
// Angular core functionality: component setup, input binding, DOM access, event listening, lifecycle
import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnDestroy
} from '@angular/core';

// Angular CDK overlay system: used to create floating components
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder
} from '@angular/cdk/overlay';

// Angular CDK utility to dynamically insert components into overlays
import { ComponentPortal } from '@angular/cdk/portal';

// The component that will appear as a hover overlay
import { HoverPreview } from './../hover-preview/hover-preview';

@Component({
  selector: 'app-movie-card',                // HTML tag to use this component
  standalone: true,                          // No need for Angular module
  templateUrl: './movie-card.html',          // Component view file
  styleUrls: ['./movie-card.css'],           // Styling for the component
  imports: []                    // The preview component is dynamically injected
})
export class MovieCard implements OnDestroy {
  @Input() movie!: Movie;                       // Movie object received from parent (Carousel)

  // CDK overlay reference (will hold the floating preview)
  private overlayRef: OverlayRef | null = null;

  // Flags to track the hover states and overlay creation
  private overlayCreated = false;
  private isCardHovered = false;
  private isOverlayHovered = false;

  constructor(
    private overlay: Overlay,                        // Service to create and control overlays
    private positionBuilder: OverlayPositionBuilder, // For positioning the preview
    private elementRef: ElementRef                   // Reference to this card's DOM element
  ) {}

  /**
   * Mouse enters the movie card
   * - If the card is fully visible, create the overlay
   */
  @HostListener('mouseenter')
  onCardEnter(): void {
    this.isCardHovered = true;

    if (!this.isFullyVisible()) return;

    if (!this.overlayCreated) {
      this.showPreview(); // Show overlay once on first hover
    }
  }

  /**
   * Mouse leaves the movie card
   * - Try hiding the overlay (only if preview isn't hovered)
   */
  @HostListener('mouseleave')
  onCardLeave(): void {
    this.isCardHovered = false;
    this.tryHideOverlay();
  }

  /**
   * Checks whether the entire card is inside the visible viewport of its scroll container
   */
  private isFullyVisible(): boolean {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const container = this.findScrollParent(this.elementRef.nativeElement);
    const containerRect = container?.getBoundingClientRect();

    if (!containerRect) return false;

    // Check top, bottom, left, and right edges are within the container
    return (
      rect.top >= containerRect.top &&
      rect.bottom <= containerRect.bottom &&
      rect.left >= containerRect.left &&
      rect.right <= containerRect.right
    );
  }

  /**
   * Finds the nearest scrollable parent of this card
   * - Used to check visibility and clipping
   */
  private findScrollParent(element: HTMLElement): HTMLElement | null {
    let parent: HTMLElement | null = element.parentElement;

    while (parent) {
      const styles = window.getComputedStyle(parent);
      const isScrollableY = ['auto', 'scroll'].includes(styles.overflowY);
      const isScrollableX = ['auto', 'scroll'].includes(styles.overflowX);

      if (isScrollableY || isScrollableX) return parent;
      parent = parent.parentElement;
    }

    return null; // Fallback
  }

  /**
   * Creates and displays the hover preview overlay
   */
  private showPreview(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)  // Anchor the overlay to this card
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'top'
        }
      ])
      .withPush(false); // Allow overflow outside the viewport

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      panelClass: 'hover-overlay-panel'
    });

    const portal = new ComponentPortal(HoverPreview);   // Dynamically insert HoverPreview
    const componentRef = this.overlayRef.attach(portal); // Render it inside the overlay
    componentRef.instance.movie = this.movie;            // Pass movie data to the preview

    // Listen to hover state on the preview component
    componentRef.instance.mouseEntered.subscribe(() => {
      this.isOverlayHovered = true;
    });

    componentRef.instance.mouseLeft.subscribe(() => {
      this.isOverlayHovered = false;
      this.tryHideOverlay(); // Try hiding when preview is left
    });

    this.overlayCreated = true;
  }

  /**
   * Hide the overlay only if neither card nor preview is hovered
   */
  private tryHideOverlay(): void {
    setTimeout(() => {
      if (!this.isCardHovered && !this.isOverlayHovered) {
        this.hideOverlay();
      }
    }, 80); // Slight delay to allow moving between card and preview
  }

  /**
   * Detaches and disposes of the overlay if it exists
   */
  private hideOverlay(): void {
    try {
      if (this.overlayRef?.hasAttached()) {
        this.overlayRef.detach(); // Remove the component
      }
      this.overlayRef?.dispose(); // Destroy overlay resources
      this.overlayRef = null;
      this.overlayCreated = false;
    } catch (error) {
      console.warn('Error disposing overlay:', error);
    }
  }

  /**
   * Cleanup when the component is destroyed (e.g. navigating away)
   */
  ngOnDestroy(): void {
    this.hideOverlay();
  }
}
