import { Test, TestingModule } from '@nestjs/testing';
import { OrderStateController } from './orderState.controller';
import { OrderStateService } from './orderState.service';

describe('OrderStateController', () => {
    let controller: OrderStateController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderStateController],
            providers: [OrderStateService],
        }).compile();

        controller = module.get<OrderStateController>(OrderStateController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});