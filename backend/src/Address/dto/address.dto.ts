import { OmitType, PartialType } from "@nestjs/mapped-types";
import { AddressEntity } from "../entities/address.entity";

export class AddressDto extends OmitType(AddressEntity, ['id', 'billingAddress', 'shippingAddress']) {
}