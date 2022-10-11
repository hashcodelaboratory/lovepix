import {MutationOptions, useMutation, UseMutationResult} from "react-query";
import {database} from "../../../../../utils/firebase/config";
import {doc, setDoc} from "@firebase/firestore";
import {Collections} from "../../../../../utils/firebase/enums";
import {UploadedImage} from "../../../../app-context/app-context";
import {ORDER_ID_KEY} from "../../../../../utils/sessionStorage/utils/keys";

export type CreateOrderRequest = {
    image: UploadedImage;
}

const createOrder = async (data: CreateOrderRequest) => {
    const docID = Date.now().toString();
    await setDoc(doc(database, Collections.ORDERS, docID), {
        ...data
    });
    sessionStorage.setItem(ORDER_ID_KEY, docID);
}

export const useCreateOrder = (options?: MutationOptions<any, any, CreateOrderRequest>)
    : UseMutationResult<any, any, CreateOrderRequest> => useMutation(createOrder, options);