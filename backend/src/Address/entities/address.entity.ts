import { Address as AddressModel } from '@prisma/client';
import type { Recipient } from '@prisma/client';

export class AddressEntity implements AddressModel {
    id: string;
    first_name: string;
    last_name: string;
    street: string;
    city: string;
    zip: string;
    email: string;
    phone: string;
    company: string;
    billing_address: Recipient[];
    shipping_address: Recipient[];
}