import { TestBed } from '@angular/core/testing';

import { AnkiManipulationService } from './anki-manipulation.service';

describe('AnkiManipulationService', () => {
  let service: AnkiManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnkiManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
