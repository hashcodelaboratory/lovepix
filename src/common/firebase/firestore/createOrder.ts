import { MutationOptions, useMutation, UseMutationResult } from "react-query";
import { collection, doc, writeBatch } from "@firebase/firestore";
import { database } from "../config";
import { Collections } from "../enums";
import { Delivery, Payment } from "../../enums/summary";
import { FormInputs } from "../../types/form";

type CreateOrderRequest = {
  form: FormInputs;
  date: number;
  shoppingCart: any;
  totalPrice: number;
  delivery: Delivery;
  payment: Payment,
}

const createOrder = async (data: CreateOrderRequest) => {
  const batch = writeBatch(database);
  const newOrderRef = doc(collection(database, Collections.ORDERS));

  await batch.update(newOrderRef, data);

  await batch.commit();
};

export const useCreateOrder = (options?: MutationOptions<any, any, CreateOrderRequest>)
  : UseMutationResult<any, any, CreateOrderRequest> => useMutation(createOrder, options);