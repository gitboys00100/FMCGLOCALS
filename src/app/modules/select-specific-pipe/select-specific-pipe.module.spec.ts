import { SelectSpecificPipeModule } from './select-specific-pipe.module';

describe('SelectSpecificPipeModule', () => {
  let selectSpecificPipeModule: SelectSpecificPipeModule;

  beforeEach(() => {
    selectSpecificPipeModule = new SelectSpecificPipeModule();
  });

  it('should create an instance', () => {
    expect(selectSpecificPipeModule).toBeTruthy();
  });
});
