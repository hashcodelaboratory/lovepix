import { Order as OrderModel } from '@prisma/client';
import type { Recipient, OrderState, Payment, Shipment } from '@prisma/client';

export class OrderEntity implements OrderModel {
    id: string;
    recipient: Recipient;
    recipientId: string;
    orderState: OrderState;
    orderStateId: string;
    payment: Payment;
    paymentId: string;
    shipment: Shipment;
    shipmentId: string;
    orderDate: Date;
}