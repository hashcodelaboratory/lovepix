import {useQuery, UseQueryResult} from "react-query";
import {database} from "../../../../../utils/firebase/config";
import {doc, getDoc} from "@firebase/firestore";
import {Collections} from "../../../../../utils/firebase/enums";
import {ORDER_KEY} from "./utils/keys";

const getOrder = async (id: string): Promise<any> => {
    const docRef = doc(database, Collections.ORDERS, id);
    const {data, exists} = await getDoc(docRef);

    return exists() ? data() : {};
}

export const useOrder = (id: string): UseQueryResult<any> =>
    useQuery([ORDER_KEY, () => getOrder(id)]);