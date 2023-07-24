import { Recipient as RecipientModel } from '@prisma/client';
import type { User, Address, Order } from '@prisma/client';

export class RecipientEntity implements RecipientModel {
    id: string;
    userID: string;
    user: User;
    billing_addressID: string;
    billing_address: Address;
    shipping_addressID: string;
    shipping_address: Address;
    orders: Order[]
    ico: string;
    dic: string;
}