import { Delivery } from "../enums/delivery";
import { Payment } from "../enums/payment";

export type Summary = {
  delivery: Delivery;
  payment: Payment;
};
