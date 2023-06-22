import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.scss'],
})
export class ImageSectionComponent {
  @ViewChild('input') input: any;
  @ViewChild('img') img: any;

  imageUrl: string = '';

  isOpenChooseAnotherImagePopUp: boolean = false;

  handleCloseModalChooseImage() {
    this.isOpenChooseAnotherImagePopUp = false;
    document.body.style.overflow = 'auto';
  }

  handleChangeUrl(event: any) {
    this.img.nativeElement.src = event.target.value;
  }

  handleChooseImage(event: any) {
    this.img.nativeElement.src = event;
    this.input.nativeElement.value = event;
  }
  handleError() {
    this.img.nativeElement.src = '../../assets/images/error.jpg';
  }
}
