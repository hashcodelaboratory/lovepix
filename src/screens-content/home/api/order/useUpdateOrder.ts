import {MutationOptions, useMutation, UseMutationResult} from "react-query";
import {database} from "../../../../../utils/firebase/config";
import {doc, writeBatch} from "@firebase/firestore";
import {Collections} from "../../../../../utils/firebase/enums";
import {UploadedImage} from "../../../../app-context/app-context";
import {ORDER_ID_KEY} from "../../../../../utils/sessionStorage/utils/keys";
import {FormInputs} from "../../../shopping-cart/components/summary/components/form/utils/types";
import {SummaryFormInputs} from "../../../shopping-cart/components/summary/components/delivery/utils/types";

export type UpdateOrderRequest = {
    image?: UploadedImage;
    date?: number;
    form?: FormInputs;
    summary?: SummaryFormInputs;
}

const updateOrder = async (data: UpdateOrderRequest) => {
    const docID = sessionStorage.getItem(ORDER_ID_KEY);
    const batch = writeBatch(database);

    if (docID) {
        const docRef = doc(database, Collections.ORDERS, docID);
        await batch.update(docRef, {
            ...data
        });

        await batch.commit();
    }
}

export const useUpdateOrder = (options?: MutationOptions<any, any, UpdateOrderRequest>)
    : UseMutationResult<any, any, UpdateOrderRequest> => useMutation(updateOrder, options);