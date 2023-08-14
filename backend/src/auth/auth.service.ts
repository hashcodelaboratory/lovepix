import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateApiKey(apiKey: string) {
    const apiKeys: string[] = ['api-test-key'];

    return apiKeys.includes(apiKey)
  }
}
