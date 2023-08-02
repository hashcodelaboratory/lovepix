import { Product as ProductModel } from '@prisma/client';
import type { Category, Order_item } from '@prisma/client';

export class ProductEntity implements ProductModel {
    id: string;
    categoryIDs: string[];
    categories: Category[]; 
    name: string;
    description: string;
    count: number;
    image: string;
    path: string;
    price: number;
    orders: Order_item[];
}