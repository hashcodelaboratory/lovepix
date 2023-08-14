import {Injectable} from '@nestjs/common';
import {API_KEY} from "./constants";
import {ConfigService} from "@nestjs/config";
import {UsersService} from "../data/users/users.service";
import {JwtService} from "@nestjs/jwt";

const CONFIG_API_KEY = 'API_KEY'
export const CONFIG_JWT_SECRET = 'JWT_SECRET'

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService, private usersService: UsersService, private jwtService: JwtService) {
  }

  validateApiKey(apiKey: string) {
    const defaultApiKey = this.configService.get<string>(CONFIG_API_KEY)
    const apiKeys: string[] = [defaultApiKey];

    return apiKeys.includes(apiKey)
  }

  async validateUser(username: string, password: string): Promise<{ username: string } | null> {
    const user = await this.usersService.findOne(username);

    if (user && user.password == password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password, ...result} = user;

      return result;
    }

    return null
  }

  async login(user: { username: string, userId: string }) {
    const payload = {username: user.username, sub: user.userId}

    return {
      access_token: this.jwtService.sign(payload, {secret: this.configService.get<string>(CONFIG_JWT_SECRET)})
    }
  }
}
