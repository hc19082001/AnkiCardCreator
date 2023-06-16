import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordFamilySectionComponent } from './word-family-section.component';

describe('WordFamilySectionComponent', () => {
  let component: WordFamilySectionComponent;
  let fixture: ComponentFixture<WordFamilySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordFamilySectionComponent]
    });
    fixture = TestBed.createComponent(WordFamilySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
