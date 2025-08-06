import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-genre-badge',
  templateUrl: './genre-badge.html',
  styleUrls: ['./genre-badge.css']
})
export class GenreBadge {
  @Input() genre = '';
  @Input() id?: number;
  @Output() selectGenre = new EventEmitter<number>();

  onClick() {
    if (this.id != null) this.selectGenre.emit(this.id);
  }
}
