import { Payment as PaymentMethod } from '@prisma/client';
import type { Order } from '@prisma/client';

export class PaymentEntity implements PaymentMethod {
    id: string;
    method: string;
    price: number;
    orders: Order[]
}