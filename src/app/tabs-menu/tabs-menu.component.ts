import { Component, Input } from '@angular/core';
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

  handleClickMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  closePopUp() {
    this.isShowReviewFC = false;
    document.body.style.overflow = 'auto';
  }
}
