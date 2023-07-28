import { Order_state as OrderStateModel } from '@prisma/client';
import type { Order } from '@prisma/client';

export class OrderStateEntity implements OrderStateModel {
    id: string;
    title: string;
    orders: Order[]
    date: Date;
}