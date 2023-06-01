import { TestBed } from '@angular/core/testing';

import { MealtypeService } from './mealtype.service';

describe('MealtypeService', () => {
  let service: MealtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
