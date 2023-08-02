import { Module } from "@nestjs/common";
import { OrderStateService } from "./order_state.service";
import { OrderStateController } from "./order_state.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [OrderStateController],
    providers: [OrderStateService]
})
export class OrderStateModule {}