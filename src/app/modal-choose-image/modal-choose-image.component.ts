import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-choose-image',
  templateUrl: './modal-choose-image.component.html',
  styleUrls: ['./modal-choose-image.component.scss'],
})
export class ModalChooseImageComponent {
  @Output() close = new EventEmitter<void>();
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }
}
