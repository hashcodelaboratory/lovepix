import { MutationOptions, useMutation, UseMutationResult } from "react-query";
import { database } from "../config";
import { doc, writeBatch } from "@firebase/firestore";
import { Collections } from "../enums";
import {FormInputs} from "../../types/form";
import {Summary} from "../../types/summary";
import { Image } from "../../types/order";

export type UpdateOrderRequest = {
    image?: Image;
    date?: number;
    form?: FormInputs;
    summary?: Summary;
    shoppingCart?: {
        images: Image[];
    };
    totalPrice?: number;
    pdf?: string;
}

const updateOrder = async (data: UpdateOrderRequest) => {
    //TODO: handle orderId
    const orderID = '';
    const batch = writeBatch(database);

    if (orderID) {
        const docRef = doc(database, Collections.ORDERS, orderID);
        await batch.update(docRef, {
            ...data
        });

        await batch.commit();
    }
}

export const useUpdateOrder = (options?: MutationOptions<any, any, UpdateOrderRequest>)
    : UseMutationResult<any, any, UpdateOrderRequest> => useMutation(updateOrder, options);