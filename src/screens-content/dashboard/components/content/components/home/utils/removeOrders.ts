import {database} from "../../../../../../../../utils/firebase/config";
import {QueryClient} from "react-query";
import {ORDERS_KEY} from "../../../../../api/orders";
import {deleteDoc, doc} from "@firebase/firestore";
import {Collections} from "../../../../../../../../utils/firebase/enums";

export const removeOrders = (selectedRows: string[], queryClient: QueryClient): string => {
    selectedRows.forEach(row => {
        deleteDoc(doc(database, Collections.ORDERS, row)).then(() => {
            queryClient.invalidateQueries(ORDERS_KEY);
        }).catch((err) => {
            return err;
        });
    });
    return "";
}