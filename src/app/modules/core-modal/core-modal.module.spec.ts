import { CoreModalModule } from './core-modal.module';

describe('CoreModalModule', () => {
  let coreModalModule: CoreModalModule;

  beforeEach(() => {
    coreModalModule = new CoreModalModule();
  });

  it('should create an instance', () => {
    expect(coreModalModule).toBeTruthy();
  });
});
