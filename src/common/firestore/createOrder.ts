import {MutationOptions, useMutation, UseMutationResult} from "react-query";
import {collection, doc, writeBatch} from "@firebase/firestore";
import {database} from "../../../utils/firebase/config";
import {Collections} from "../../../utils/firebase/enums";

const createConfiguration = async (data: any) => {
    const batch = writeBatch(database);
    const newOrderRef = doc(collection(database, Collections.ORDERS));

    await batch.update(newOrderRef, data);

    await batch.commit();
}

export const useCreateOrder = (options?: MutationOptions<any, any, any>)
    : UseMutationResult<any, any, any> => useMutation(createConfiguration, options);