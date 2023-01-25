import { useQuery, UseQueryResult } from "react-query";
import { database } from "../../../../common/firebase/config";
import { collection, getDocs } from "@firebase/firestore";
import { Collections } from "../../../../common/firebase/enums";
import { ORDERS_KEY } from "./utils/keys";
import { Order } from "../../../../common/types/order";

const getOrders = async (): Promise<Order[]> => {
  const querySnapshot = await getDocs(collection(database, Collections.ORDERS));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Order)
  );
};

export const useOrders = (): UseQueryResult<Order[]> =>
  useQuery([ORDERS_KEY], () => getOrders());
