import { Component, Input } from '@angular/core';
Input;

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss'],
})
export class TabsMenuComponent {
  isOpenMenu: boolean = true;

  handleClickMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
}
