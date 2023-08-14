import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {HeaderAPIKeyStrategy} from "passport-headerapikey";
import {AuthService} from "../auth.service";
import {API_KEY_HEADER} from "../constants";

@Injectable()
export class ApikeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, API_KEY_HEADER) {
  constructor(private authService: AuthService) {
    super({header: API_KEY_HEADER, prefix: ''}, true,
      async (apiKey, done) => {
        if (this.authService.validateApiKey(apiKey)) {
          done(null, true);
        }

        done(new UnauthorizedException(), null)
      }
    )
    ;
  }
}