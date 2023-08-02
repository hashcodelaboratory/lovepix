import { OmitType } from "@nestjs/mapped-types";
import { AddressEntity } from "../entities/address.entity";

export class CreateAddressDto extends OmitType(AddressEntity, ['id', 'billing_address', 'shipping_address']) {
}