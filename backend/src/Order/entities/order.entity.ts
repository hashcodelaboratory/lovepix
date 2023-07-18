import { Order as OrderModel } from '@prisma/client';
import type { User, OrderItem, Form, Shipment, Payment } from '@prisma/client';

export class OrderEntity implements OrderModel {
    id: string;
    user: User;
    userID: string;
    items: OrderItem[];
    date: Date;
    total: number;
    form: Form;
    shipment: Shipment;
    payment: Payment;
}