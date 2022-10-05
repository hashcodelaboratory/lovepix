import {MutationOptions, useMutation, UseMutationResult, useQuery, UseQueryResult} from "react-query";
import {database} from "../../../../utils/firebase/config";
import {doc, getDoc, setDoc} from "@firebase/firestore";
import {Collections} from "../../../../utils/firebase/enums";
import {UploadedImage} from "../../../app-context/app-context";

export const ORDER_KEY = 'ORDER_KEY';

export type CreateOrderRequest = {
    image: UploadedImage;
}

const getOrder = async (id: string): Promise<any> => {
    const docRef = doc(database, Collections.ORDERS, id);
    const {data, exists} = await getDoc(docRef);

    return exists() ? data() : {};
}

const createOrder = async (data: CreateOrderRequest) => {
    await setDoc(doc(database, Collections.ORDERS, Date.now().toString()), {
        ...data
    });
}

export const useCreateOrder = (options?: MutationOptions<any, any, CreateOrderRequest>)
    : UseMutationResult<any, any, CreateOrderRequest> => useMutation(createOrder, options);

export const useOrder = (id: string): UseQueryResult<any> =>
    useQuery([ORDER_KEY, () => getOrder(id)]);