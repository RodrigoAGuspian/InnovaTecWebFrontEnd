import { TestBed } from '@angular/core/testing';

import { EmailNotificationService } from './email-notification.service';

describe('EmailNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailNotificationService = TestBed.get(EmailNotificationService);
    expect(service).toBeTruthy();
  });
});
