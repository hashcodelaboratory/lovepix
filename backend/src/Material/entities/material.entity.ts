import { Material as MaterialModel } from '@prisma/client';
import type { Order } from '@prisma/client';

export class MaterialEntity implements MaterialModel {
    id: string;
    title: string;
    orders: Order[]
}