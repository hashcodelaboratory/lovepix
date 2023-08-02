import { Dimension as DimensionModel } from '@prisma/client';
import type { Gallery } from '@prisma/client';

export class DimensionEntity implements DimensionModel {
    id: string;
    title: string;
    galleryIDs: string[];
    galleries: Gallery[];
}