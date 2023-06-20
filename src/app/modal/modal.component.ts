import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() maxwidth: string = 'max-w-[600px]';
  isOpen: boolean = true;
  @Output() close = new EventEmitter<void>();
  emitCLosAction() {
    this.isOpen = false;
    setTimeout(() => {
      this.close.emit();
    }, 500);
  }
}
