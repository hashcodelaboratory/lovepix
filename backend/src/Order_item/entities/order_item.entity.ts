import { Order_item as Order_itemModel } from '@prisma/client';
import type { Order, Product, Gallery } from '@prisma/client';

export class Order_itemEntity implements Order_itemModel {
    id: string;
    order: Order;
    orderID: string;
    product: Product;
    productID: string;
    image: Gallery;
    imageID: string;
    quantity: number;
    material: string;
    dimension: string;
    voucher: string;
}