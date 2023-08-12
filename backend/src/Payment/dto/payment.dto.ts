import { OmitType } from "@nestjs/mapped-types";
import { PaymentEntity } from "../entities/payment.entity";

export class PaymentDto extends OmitType(PaymentEntity, ['id', 'orders']) {
}