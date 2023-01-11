import { MutationOptions, useMutation, UseMutationResult } from "react-query";
import { database } from "../../../../../utils/firebase/config";
import { doc, writeBatch } from "@firebase/firestore";
import { Collections } from "../../../../../utils/firebase/enums";
import {ShoppingCart, UploadedImage} from "../../../../app-context/app-context";
import { ORDER_ID_KEY } from "../../../../../utils/sessionStorage/utils/keys";
import {FormInputs} from "../../../../common/types/form";
import {Summary} from "../../../../common/types/summary";

export type UpdateOrderRequest = {
    image?: UploadedImage | null;
    date?: number;
    form?: FormInputs;
    summary?: Summary;
    shoppingCart?: ShoppingCart | null;
    totalPrice?: number;
}

const updateOrder = async (data: UpdateOrderRequest) => {
    const orderID = sessionStorage.getItem(ORDER_ID_KEY);
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