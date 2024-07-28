import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomVerseButtonComponent } from './random-verse-button.component';

describe('RandomVerseButtonComponent', () => {
  let component: RandomVerseButtonComponent;
  let fixture: ComponentFixture<RandomVerseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomVerseButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomVerseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
