import {useQuery, UseQueryResult} from "react-query";
import {database} from "../../../../../utils/firebase/config";
import {doc, getDoc} from "@firebase/firestore";
import {Collections} from "../../../../../utils/firebase/enums";
import {ORDER_KEY} from "./utils/keys";
import {ORDER_ID_KEY} from "../../../../../utils/sessionStorage/utils/keys";

const getOrder = async (): Promise<any> => {
    const orderID = sessionStorage.getItem(ORDER_ID_KEY) ?? '';
    const docRef = doc(database, Collections.ORDERS, orderID);
    const _doc = await getDoc(docRef);

    return _doc.exists() ? _doc.data() : {};
}

export const useOrder = (): UseQueryResult<any> =>
    useQuery([ORDER_KEY], () => getOrder());