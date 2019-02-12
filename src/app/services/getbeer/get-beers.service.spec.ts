import { TestBed, inject } from '@angular/core/testing';

import { GetBeersService } from './get-beers.service';

describe('GetBeersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBeersService]
    });
  });

  it('should be created', inject([GetBeersService], (service: GetBeersService) => {
    expect(service).toBeTruthy();
  }));
});
