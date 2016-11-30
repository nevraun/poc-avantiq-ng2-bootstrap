/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdalHttpService } from './adalhttp.service';

describe('Service: AdalHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdalHttpService]
    });
  });

  it('should ...', inject([AdalHttpService], (service: AdalHttpService) => {
    expect(service).toBeTruthy();
  }));
});
