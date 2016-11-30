/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvantiqService } from './avantiq.service';

describe('Service: Avantiq', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvantiqService]
    });
  });

  it('should ...', inject([AvantiqService], (service: AvantiqService) => {
    expect(service).toBeTruthy();
  }));
});
