import EmptyCart from "./components/empty-cart/empty-cart";
import {useContext} from "react";
import AppContext from "../../app-context/app-context";
import Summary from "./components/summary/summary/summary";
import ThanksForOrder from "./components/thanks-for-order/thanks-for-order";

const CustomShoppingCart = () => {
    const { state: { image: { size }, stepper } } = useContext(AppContext);

    if (size === 0 && stepper !== 2) return <EmptyCart />;

    if (stepper === 2) return <ThanksForOrder />;

    return <Summary />;
}

export default CustomShoppingCart