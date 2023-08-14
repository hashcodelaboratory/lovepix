import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApikeyAuthGuard} from "./auth/guard/apikey-auth.guard";
import {AuthService} from "./auth/auth.service";
import {LocalAuthGuard} from "./auth/guard/local-auth.guard";
import {JwtAuthGuard} from "./auth/guard/jwt-auth.guard";

@UseGuards(ApikeyAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  // TODO: remove this when all team members will be familiar with auth integration for API - this serves only as an example
  @UseGuards(JwtAuthGuard)
  @Get('jwt')
  async jwt(@Request() req) {
    return req.user
  }
}

