import {User as UserModel} from '@prisma/client';
import type {Address} from '@prisma/client';
import type {Post} from '@prisma/client';

export class UserEntity implements UserModel {
    id: string;
    email: string;
    name: string;
    address: Address;
    posts: Post[]
}