import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from './orderItem.service';

describe('OrderItemService', () => {
    let service: OrderItemService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderItemService],
        }).compile();

        service = module.get<OrderItemService>(OrderItemService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});