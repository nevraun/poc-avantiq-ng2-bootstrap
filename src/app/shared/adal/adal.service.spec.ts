/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdalService } from './adal.service';

describe('Service: Adal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdalService]
    });
  });

  it('should ...', inject([AdalService], (service: AdalService) => {
    expect(service).toBeTruthy();
  }));
});
