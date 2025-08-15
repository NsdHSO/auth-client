import { TestBed } from '@angular/core/testing';

import { EventBuss } from './event-buss';

describe('EventBuss', () => {
  let service: EventBuss;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventBuss);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
