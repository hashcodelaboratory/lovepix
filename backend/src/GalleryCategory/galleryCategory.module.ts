import { Module } from "@nestjs/common";
import { GalleryCategoryService } from "./galleryCategory.service";
import { GalleryCategoryController } from "./galleryCategory.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [GalleryCategoryController],
    providers: [GalleryCategoryService]
})
export class GalleryCategoryModule {}