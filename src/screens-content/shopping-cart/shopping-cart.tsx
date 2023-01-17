import EmptyCart from "./components/empty-cart/empty-cart";
import Summary from "./components/summary/summary/summary";
import ThanksForOrder from "./components/thanks-for-order/thanks-for-order";
import {useLiveQuery} from "dexie-react-hooks";
import {orderTable} from "../../../database.config";
import {useContext} from "react";
import AppContext from "../../app-context/app-context";

const CustomShoppingCart = () => {
    const { state: { stepper } } = useContext(AppContext);

    const order = useLiveQuery(
        () => orderTable.get('order'),
        []
    );

    if (!order?.shoppingCart?.images && stepper !== 2) return <EmptyCart />;

    if (stepper === 2) return <ThanksForOrder />;

    return <Summary />;
}

export default CustomShoppingCart