import EmptyCart from "./components/empty-cart/empty-cart";
import Summary from "./components/summary/summary/summary";
import ThanksForOrder from "./components/thanks-for-order/thanks-for-order";
import { useContext } from "react";
import AppContext from "../../app-context/app-context";
import { Order } from "../../common/types/order";

type CustomShoppingCartProps = {
  order: Order;
}

const CustomShoppingCart = ({ order }: CustomShoppingCartProps) => {
  const {
    state: { stepper },
  } = useContext(AppContext);

  if (!order?.shoppingCart?.images && stepper !== 2) return <EmptyCart />;

  if (stepper === 2) return <ThanksForOrder />;

  return <Summary order={order} />;
};

export default CustomShoppingCart;
