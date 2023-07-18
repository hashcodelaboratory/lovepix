import { User as UserModel } from '@prisma/client';
import type { Order } from '@prisma/client';

export class UserEntity implements UserModel {
    id: string;
    email: string;
    name: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    orders: Order[]
}