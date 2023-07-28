import { Gallery as GalleryModel } from '@prisma/client';
import type { Gallery_category, Dimension } from '@prisma/client';

export class GalleryEntity implements GalleryModel {
    id: string;
    gallery_categoryIDs: string[];
    gallery_categories: Gallery_category[];
    dimensionIDs: string[];
    dimensions: Dimension[];
    bucket: string;
    full_path: string;
    price: number;
    size: number;
    time_created: Date;
    updated_at: Date;
    url: string;
    name: string;
    image: string;
    material: string;
}