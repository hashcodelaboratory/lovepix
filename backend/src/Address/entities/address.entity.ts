import { Address as AddressModel } from '@prisma/client';
import type { Recipient } from '@prisma/client';

export class AddressEntity implements AddressModel {
    id: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    zip: string;
    email: string;
    phone: string;
    company: string;
    billingAddress: Recipient[];
    shippingAddress: Recipient[];
}