import { Shipment as ShipmentModel } from '@prisma/client';
import type { Order } from '@prisma/client';

export class ShipmentEntity implements ShipmentModel {
    id: string;
    method: string;
    price: number;
    orders: Order[];
}