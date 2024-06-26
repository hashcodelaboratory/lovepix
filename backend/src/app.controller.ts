import {Controller, Get, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApikeyAuthGuard} from "./auth/guard/apikey-auth.guard";
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {AppSettings} from "./constants/constants";


@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

