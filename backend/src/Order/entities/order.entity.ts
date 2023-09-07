import { Order as OrderModel } from '@prisma/client';
import type {
  Recipient,
  OrderState,
  Payment,
  Shipment,
  OrderItem
} from '@prisma/client';

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
  createDate: Date;
  updateDate: Date;
  orderItems: OrderItem[];
}
