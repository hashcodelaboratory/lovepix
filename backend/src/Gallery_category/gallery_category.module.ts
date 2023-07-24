import { Module } from "@nestjs/common";
import { GalleryCategoryService } from "./gallery_category.service";
import { GalleryCategoryController } from "./gallery_category.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [GalleryCategoryController],
    providers: [GalleryCategoryService]
})
export class GalleryCategoryModule {}