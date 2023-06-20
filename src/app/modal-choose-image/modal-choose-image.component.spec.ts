import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChooseImageComponent } from './modal-choose-image.component';

describe('ModalChooseImageComponent', () => {
  let component: ModalChooseImageComponent;
  let fixture: ComponentFixture<ModalChooseImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalChooseImageComponent]
    });
    fixture = TestBed.createComponent(ModalChooseImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
