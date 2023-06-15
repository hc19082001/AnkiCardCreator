import { Component } from '@angular/core';
import { synonyms } from 'src/data';

@Component({
  selector: 'app-synonym-section',
  templateUrl: './synonym-section.component.html',
  styleUrls: ['./synonym-section.component.scss'],
})
export class SynonymSectionComponent {
  data: string[] = synonyms;
}
