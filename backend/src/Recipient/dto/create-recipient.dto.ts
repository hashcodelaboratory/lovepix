import { OmitType } from "@nestjs/mapped-types";
import { RecipientEntity } from "../entities/recipient.entity";

export class CreateRecipientDto extends OmitType(RecipientEntity, ['id', 'orders', 'user', 'billingAddress', 'shippingAddress']) {
}