import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChooseDeckComponent } from './modal-choose-deck.component';

describe('ModalChooseDeckComponent', () => {
  let component: ModalChooseDeckComponent;
  let fixture: ComponentFixture<ModalChooseDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalChooseDeckComponent]
    });
    fixture = TestBed.createComponent(ModalChooseDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
