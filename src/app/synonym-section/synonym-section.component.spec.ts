import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymSectionComponent } from './synonym-section.component';

describe('SynonymSectionComponent', () => {
  let component: SynonymSectionComponent;
  let fixture: ComponentFixture<SynonymSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SynonymSectionComponent]
    });
    fixture = TestBed.createComponent(SynonymSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
