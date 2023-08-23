import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4000',
      'http://18.194.151.159:27017'
    ],
    //methods: ["GET", "POST"],
    //credentials: true,
  });

const config = new DocumentBuilder()
  .setTitle('Lovepix Backend documentation')
  .addApiKey({type: 'apiKey', name: 'API-KEY', in: 'header'}, 'API-KEY')
  .setDescription('The LOVEPIX API description')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-lovepix', app, document);

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.enableCors();
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
