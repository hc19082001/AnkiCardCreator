import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm-card',
  templateUrl: './modal-confirm-card.component.html',
  styleUrls: ['./modal-confirm-card.component.scss'],
})
export class ModalConfirmCardComponent {
  @Output() close = new EventEmitter<void>();
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }
}
