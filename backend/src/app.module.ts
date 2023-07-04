import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";

const ENV_PACKAGE = "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(ENV_PACKAGE).config();

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
