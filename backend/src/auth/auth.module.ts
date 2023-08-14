import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ApikeyStrategy} from "./apikey.strategy";

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApikeyStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
