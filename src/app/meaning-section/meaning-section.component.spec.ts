import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningSectionComponent } from './meaning-section.component';

describe('MeaningSectionComponent', () => {
  let component: MeaningSectionComponent;
  let fixture: ComponentFixture<MeaningSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeaningSectionComponent]
    });
    fixture = TestBed.createComponent(MeaningSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
