import { Gallery as GalleryModel } from '@prisma/client';
import type { GalleryCategory, Dimension, OrderItem } from '@prisma/client';

export class GalleryEntity implements GalleryModel {
    id: string;
    galleryCategoryIds: string[];
    galleryCategories: GalleryCategory[];
    dimensionIds: string[];
    dimensions: Dimension[];
    bucket: string;
    fullPath: string;
    price: number;
    size: number;
    timeCreated: Date;
    updatedAt: Date;
    url: string;
    name: string;
    image: string;
    material: string;
    orders: OrderItem[];
}