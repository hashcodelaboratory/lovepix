import { FormInputs } from "./form";
import { Material } from "../enums/material";
import { Delivery, Payment } from "../enums/summary";

export type Image = {
  name: string;
  url: string;
  width: number;
  height: number;
  qty: number;
  origin: string;
  material: Material;
  price: number;
};

export type Order = {
  id: string;
  date: Date;
  form: FormInputs;
  shoppingCart: {
    images: Image[];
  };
  delivery: Delivery;
  payment: Payment;
  totalPrice: number;
  pdf: string;
};
