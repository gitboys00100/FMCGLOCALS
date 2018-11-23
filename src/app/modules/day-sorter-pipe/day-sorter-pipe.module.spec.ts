import { DaySorterPipeModule } from './day-sorter-pipe.module';

describe('DaySorterPipeModule', () => {
  let daySorterPipeModule: DaySorterPipeModule;

  beforeEach(() => {
    daySorterPipeModule = new DaySorterPipeModule();
  });

  it('should create an instance', () => {
    expect(daySorterPipeModule).toBeTruthy();
  });
});
