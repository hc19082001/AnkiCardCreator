import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmCardComponent } from './modal-confirm-card.component';

describe('ModalConfirmCardComponent', () => {
  let component: ModalConfirmCardComponent;
  let fixture: ComponentFixture<ModalConfirmCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmCardComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
