import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ApikeyStrategy} from "./strategy/apikey.strategy";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [AuthService, ApikeyStrategy],
  exports: [AuthService]
})
export class AuthModule {
}