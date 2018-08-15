import { TestBed, inject } from '@angular/core/testing';

import { PrudencssButtonService } from './prudencss-button.service';

describe('PrudencssButtonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrudencssButtonService]
    });
  });

  it('should be created', inject([PrudencssButtonService], (service: PrudencssButtonService) => {
    expect(service).toBeTruthy();
  }));
});
