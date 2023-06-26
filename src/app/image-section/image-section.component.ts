import { Component, Input, ViewChild } from '@angular/core';
import { AnkiManipulationService } from '../anki-manipulation.service';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.scss'],
})
export class ImageSectionComponent {
  @ViewChild('input') input: any;
  @ViewChild('img') img: any;

  imageUrl: string = '';
  @Input() wordNeedToLookUp: string = '';

  isOpenChooseAnotherImagePopUp: boolean = false;

  constructor(private anki: AnkiManipulationService) {}

  handleCloseModalChooseImage() {
    this.isOpenChooseAnotherImagePopUp = false;
    document.body.style.overflow = 'auto';
  }

  handleChangeUrl(event: any) {
    this.img.nativeElement.src = event.target.value;
    this.anki.setImageUrl(event.target.value);
  }

  handleChooseImage(event: any) {
    this.img.nativeElement.src = event;
    this.input.nativeElement.value = event;
    this.anki.setImageUrl(event);
  }
  handleError() {
    this.img.nativeElement.src = '../../assets/images/error.jpg';
  }
}
