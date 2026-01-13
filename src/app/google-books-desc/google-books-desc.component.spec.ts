import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleBooksDescComponent } from './google-books-desc.component';

describe('GoogleBooksDescComponent', () => {
  let component: GoogleBooksDescComponent;
  let fixture: ComponentFixture<GoogleBooksDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleBooksDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleBooksDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
