import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { OrderModule } from './Order/order.module';
import { ProductModule } from './Product/product.module';
import { OrderItemModule } from './OrderItem/order_item.module';



const ENV_PACKAGE = "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(ENV_PACKAGE).config();

@Module({
  imports: [PrismaModule, UserModule, OrderModule, ProductModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
