import { Delivery, Payment } from "../enums/summary";

export type Summary = {
  delivery: Delivery;
  payment: Payment;
};
