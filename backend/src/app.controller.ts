import {Controller, Get, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApikeyAuthGuard} from "./auth/guard/apikey-auth.guard";

@UseGuards(ApikeyAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

