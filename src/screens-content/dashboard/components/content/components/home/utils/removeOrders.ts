import {database} from "../../../../../../../common/firebase/config";
import {QueryClient} from "react-query";
import {ORDERS_KEY} from "../../../../../api/orders/utils/keys";
import {deleteDoc, doc} from "@firebase/firestore";
import {Collections} from "../../../../../../../common/firebase/enums";

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