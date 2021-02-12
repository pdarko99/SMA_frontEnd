import { TestBed } from '@angular/core/testing';

import { ClassDetailsService } from './class-details.service';

describe('ClassDetailsService', () => {
  let service: ClassDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
