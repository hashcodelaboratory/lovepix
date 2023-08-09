import { Product as ProductModel } from '@prisma/client';
import type { Category, OrderItem } from '@prisma/client';

export class ProductEntity implements ProductModel {
    id: string;
    categoryIds: string[];
    categories: Category[]; 
    name: string;
    description: string;
    count: number;
    image: string;
    path: string;
    price: number;
    orders: OrderItem[];
}