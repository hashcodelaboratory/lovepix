import { Product as ProductModel } from '@prisma/client';

export class ProductEntity implements ProductModel {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
}