import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ApikeyStrategy} from "./strategy/apikey.strategy";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "../data/users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
  imports: [ConfigModule, PassportModule, UsersModule, JwtModule.register({
    signOptions: { expiresIn: '1d'}
  })],
  providers: [AuthService, ApikeyStrategy, LocalStrategy, JwtStrategy, JwtService],
  exports: [AuthService, JwtService]
})
export class AuthModule {
}