import { Order as OrderModel } from '@prisma/client';
import type { Recipient, Order_state, Payment, Shipment } from '@prisma/client';

export class OrderEntity implements OrderModel {
    id: string;
    recipient: Recipient;
    recipientID: string;
    order_state: Order_state;
    order_stateID: string;
    payment: Payment;
    paymentID: string;
    shipment: Shipment;
    shipmentID: string;
    order_date: Date;
}