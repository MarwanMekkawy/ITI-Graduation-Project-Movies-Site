import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToListButton } from './add-to-list-button';

describe('AddToListButton', () => {
  let component: AddToListButton;
  let fixture: ComponentFixture<AddToListButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToListButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToListButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
