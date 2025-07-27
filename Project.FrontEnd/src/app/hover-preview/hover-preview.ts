import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hover-preview',         // The custom tag name used in parent components
  standalone: true,                      // Allows this component to be used without NgModule
  templateUrl: './hover-preview.html',   // HTML template
  styleUrls: ['./hover-preview.css']     // Component-specific CSS
})
export class HoverPreview {
  /**
   * Input: movie data passed from parent (e.g. title, image, etc.)
   */
  @Input() movie: any;

  /**
   * Output: emits when mouse enters the hover preview
   * Used by MovieCard to keep overlay open
   */
  @Output() mouseEntered = new EventEmitter<void>();

  /**
   * Output: emits when mouse leaves the hover preview
   * Used by MovieCard to determine if it can safely close overlay
   */
  @Output() mouseLeft = new EventEmitter<void>();

  /**
   * Handler for the Add button (+)
   * You can extend this to add the movie to a favorites list or watchlist
   */
  onAddClick(): void {
    console.log('➕ Add clicked:', this.movie);
    // TODO: Add to favorites/watchlist
  }

  /**
   * Handler for the Watch button (TV icon)
   * Extend this to open a video player or navigate to detail view
   */
  onWatchClick(): void {
    console.log('▶️ Watch clicked:', this.movie);
    // TODO: Play the video or route to movie page
  }

  /**
   * Handler for the Block button (🚫)
   * Extend this to filter or restrict access
   */
  onBlockClick(): void {
    console.log('🚫 Block clicked:', this.movie);
    // TODO: Block content from being shown (parental control, etc.)
  }
}
