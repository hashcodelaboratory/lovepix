import { OrderItem as OrderItemModel } from '@prisma/client';
import type { Order, Product, Gallery } from '@prisma/client';

export class OrderItemEntity implements OrderItemModel {
    id: string;
    order: Order;
    orderId: string;
    product: Product;
    productId: string;
    image: Gallery;
    imageId: string;
    quantity: number;
    material: string;
    dimension: string;
    voucher: string;
}
