import { Module } from "@nestjs/common";
import { OrderStateService } from "./orderState.service";
import { OrderStateController } from "./orderState.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [OrderStateController],
    providers: [OrderStateService]
})
export class OrderStateModule {}