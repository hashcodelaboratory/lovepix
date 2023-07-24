import { Module } from "@nestjs/common";
import { RecipientService } from "./recipient.service";
import { RecipientController } from "./recipient.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [RecipientController],
    providers: [RecipientService]
})
export class RecipientModule {}