import { User as UserModel } from '@prisma/client';
import type { Recipient } from '@prisma/client';

export class UserEntity implements UserModel {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    orders: Recipient[]
}