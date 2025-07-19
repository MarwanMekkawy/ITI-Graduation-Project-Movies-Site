import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreBadge } from './genre-badge';

describe('GenreBadge', () => {
  let component: GenreBadge;
  let fixture: ComponentFixture<GenreBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
