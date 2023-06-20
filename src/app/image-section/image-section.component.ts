import { Component } from '@angular/core';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.scss'],
})
export class ImageSectionComponent {
  isOpenChooseAnotherImagePopUp: boolean = false;

  handleCloseModalChooseImage() {
    this.isOpenChooseAnotherImagePopUp = false;
    document.body.style.overflow = 'auto';
  }
}
