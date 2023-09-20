import { Test, TestingModule } from '@nestjs/testing';
import { OrderStateService } from './orderState.service';

describe('OrderStateService', () => {
    let service: OrderStateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderStateService],
        }).compile();

        service = module.get<OrderStateService>(OrderStateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});