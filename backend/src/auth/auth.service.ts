import { Injectable } from '@nestjs/common';
import {API_KEY} from "./constants";
import {ConfigService} from "@nestjs/config";

const CONFIG_API_KEY = 'API_KEY'

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
  }
  validateApiKey(apiKey: string) {
    const defaultApiKey = this.configService.get<string>(CONFIG_API_KEY)
    const apiKeys: string[] = [defaultApiKey];

    return apiKeys.includes(apiKey)
  }
}
