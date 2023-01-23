import { ORDER_ID_KEY } from "./utils/keys";

export const useSession = () => {
  const orderID = sessionStorage.getItem(ORDER_ID_KEY);

  const saveOrderID = (id: string) => {
    sessionStorage.setItem(ORDER_ID_KEY, id);
  };

  const clearOrderID = () => {
    sessionStorage.removeItem(ORDER_ID_KEY);
  };

  return {
    orderID,
    saveOrderID,
    clearOrderID,
  };
};
