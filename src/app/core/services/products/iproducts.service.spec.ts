import { TestBed } from '@angular/core/testing';

import { IproductsService } from './iproducts.service';

describe('IproductsService', () => {
  let service: IproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
