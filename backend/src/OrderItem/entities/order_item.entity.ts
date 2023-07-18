import { OrderItem as OrderItemModel } from "@prisma/client";
import type { Order } from "@prisma/client";

export class OrderItemEntity implements OrderItemModel {
    id: string;
    orderID: string;
    order: Order;
    productID: string;
    quantity: number;
    price: number;
}