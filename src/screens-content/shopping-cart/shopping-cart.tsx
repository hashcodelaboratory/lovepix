import EmptyCart from "./components/empty-cart/empty-cart";
import Summary from "./components/summary/summary/summary";
import { Order } from "../../common/types/order";

type CustomShoppingCartProps = {
  order: Order;
}

const CustomShoppingCart = ({ order }: CustomShoppingCartProps) => {
  if (!order?.shoppingCart?.images) return <EmptyCart />;

  //if (stepper === 2) return <ThanksForOrder />;

  return <Summary order={order} />;
};

export default CustomShoppingCart;
