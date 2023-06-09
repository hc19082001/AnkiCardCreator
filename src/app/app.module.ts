import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SectionComponent } from './section/section.component';
import { ImageSectionComponent } from './image-section/image-section.component';
import { MeaningSectionComponent } from './meaning-section/meaning-section.component';
import { ExampleSectionComponent } from './example-section/example-section.component';
import { SynonymSectionComponent } from './synonym-section/synonym-section.component';
import { WordFamilySectionComponent } from './word-family-section/word-family-section.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
import { ModalComponent } from './modal/modal.component';
import { ModalConfirmCardComponent } from './modal-confirm-card/modal-confirm-card.component';
import { ModalChooseImageComponent } from './modal-choose-image/modal-choose-image.component';
import { ModalChooseDeckComponent } from './modal-choose-deck/modal-choose-deck.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SectionComponent,
    ImageSectionComponent,
    MeaningSectionComponent,
    ExampleSectionComponent,
    SynonymSectionComponent,
    WordFamilySectionComponent,
    TabsMenuComponent,
    ModalComponent,
    ModalConfirmCardComponent,
    ModalChooseImageComponent,
    ModalChooseDeckComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
