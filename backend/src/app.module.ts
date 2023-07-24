import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { AddressModule } from './Address/address.module';
import { CategoryModule } from './Category/category.module';
import { DimensionModule } from './Dimension/dimension.module';
import { GalleryModule } from './Gallery/gallery.module';
import { GalleryCategoryModule } from './Gallery_category/gallery_category.module';
import { MaterialModule } from './Material/material.module';
import { OrderModule } from './Order/order.module';
import { OrderStateModule } from './Order_state/order_state.module';
import { PaymentModule } from './Payment/payment.module';
import { ProductModule } from './Product/product.module';
import { RecipientModule } from './Recipient/recipient.module';
import { ShipmentModule } from './Shipment/shipment.module';




const ENV_PACKAGE = "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(ENV_PACKAGE).config();

@Module({
  imports: [PrismaModule, UserModule, AddressModule, CategoryModule, DimensionModule, GalleryModule, GalleryCategoryModule, MaterialModule, OrderModule, OrderStateModule, PaymentModule, ProductModule, RecipientModule, ShipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
