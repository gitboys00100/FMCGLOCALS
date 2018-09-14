import { AnnouncementModule } from './announcement.module';

describe('AnnouncementModule', () => {
  let announcementModule: AnnouncementModule;

  beforeEach(() => {
    announcementModule = new AnnouncementModule();
  });

  it('should create an instance', () => {
    expect(announcementModule).toBeTruthy();
  });
});
