import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './User/user.module';
import { PostModule } from './Post/post.module';
import { CommentModule } from './Comment/comment.module';



const ENV_PACKAGE = "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(ENV_PACKAGE).config();

@Module({
  imports: [PrismaModule, TodoModule, UserModule, PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
