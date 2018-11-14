import { OrderByPipeModule } from './order-by-pipe.module';

describe('OrderByPipeModule', () => {
  let orderByPipeModule: OrderByPipeModule;

  beforeEach(() => {
    orderByPipeModule = new OrderByPipeModule();
  });

  it('should create an instance', () => {
    expect(orderByPipeModule).toBeTruthy();
  });
});
