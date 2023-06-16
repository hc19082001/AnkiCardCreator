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
import { TestObservableComponent } from './test-observable/test-observable.component';
import { HttpClientModule } from '@angular/common/http';

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
    TestObservableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
