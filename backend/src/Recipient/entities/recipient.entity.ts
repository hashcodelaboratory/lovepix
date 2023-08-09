import { Recipient as RecipientModel } from '@prisma/client';
import type { User, Address, Order } from '@prisma/client';

export class RecipientEntity implements RecipientModel {
    id: string;
    userId: string;
    user: User;
    billingAddressId: string;
    billingAddress: Address;
    shippingAddressId: string;
    shippingAddress: Address;
    orders: Order[]
    ico: string;
    dic: string;
}