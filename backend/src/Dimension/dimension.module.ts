import { Module } from "@nestjs/common";
import { DimensionService } from "./dimension.service";
import { DimensionController } from "./dimension.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [DimensionController],
    providers: [DimensionService]
})
export class DimensionModule {}