import { Injectable } from '@nestjs/common';
import {userEqualityPredicate} from "./utils";
import {users} from "./dummy-users";
import {User} from "./user";

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    // TODO: connect Prisma user structures here
    return users.find(userEqualityPredicate(username))
  }
}
