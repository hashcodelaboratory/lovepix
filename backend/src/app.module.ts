import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { AddressModule } from './Address/address.module';
import { CategoryModule } from './Category/category.module';
import { DimensionModule } from './Dimension/dimension.module';
import { GalleryModule } from './Gallery/gallery.module';
import { GalleryCategoryModule } from './GalleryCategory/galleryCategory.module';
import { OrderModule } from './Order/order.module';
import { OrderStateModule } from './OrderState/orderState.module';
import { PaymentModule } from './Payment/payment.module';
import { ProductModule } from './Product/product.module';
import { RecipientModule } from './Recipient/recipient.module';
import { ShipmentModule } from './Shipment/shipment.module';
import { OrderItemModule } from './OrderItem/orderItem.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';




const ENV_PACKAGE = "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(ENV_PACKAGE).config();

@Module({
  imports: [AuthModule, PrismaModule, UserModule, AddressModule, CategoryModule, DimensionModule, GalleryModule, GalleryCategoryModule, OrderModule, OrderStateModule, PaymentModule, ProductModule, RecipientModule, ShipmentModule, OrderItemModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
