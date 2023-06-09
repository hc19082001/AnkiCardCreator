import { Component, Input } from '@angular/core';
import { AnkiManipulationService } from '../anki-manipulation.service';
import Swal from 'sweetalert2';
Input;

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss'],
})
export class TabsMenuComponent {
  isOpenMenu: boolean = false;

  isShowReviewFC: boolean = false;
  isShowDeckOptions: boolean = false;
  isShowTruffleOption: boolean = false;

  constructor(private anki: AnkiManipulationService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        this.isOpenMenu = false;
      }
    });
  }

  showPopUpReview() {
    this.isShowReviewFC = true;
  }

  showPopUpDeckOptions() {
    this.isShowDeckOptions = true;
  }

  showPopUpTruffleOption() {
    this.isShowTruffleOption = true;
  }

  handleClickMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  shuffleCard() {
    if (!this.anki.deckChoose) {
      this.isShowDeckOptions = true;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        text: `This act will shuffle all multichoice fields in [${this.anki.deckChoose}]. Do you want to continue ?`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.anki
            .createMultiChoicesFields(this.anki.deckChoose)
            .then((data) => {
              Swal.fire('Success', 'Truffle fields successfully', 'success');
            })
            .catch(() => {
              Swal.fire('Error', 'Error, Please try again', 'error');
            });
        }
      });
    }
  }

  closePopUp() {
    this.isShowReviewFC && (this.isShowReviewFC = false);
    this.isShowDeckOptions && (this.isShowDeckOptions = false);
    this.isShowTruffleOption && (this.isShowTruffleOption = false);
    document.body.style.overflow = 'auto';
  }
}
