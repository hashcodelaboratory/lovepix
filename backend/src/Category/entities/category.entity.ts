import { Category as CategoryModel } from '@prisma/client';
import type { Product } from '@prisma/client';

export class CategoryEntity implements CategoryModel {
    id: string;
    title: string;
    productIds: string[];
    products: Product[];
}