import EmptyCart from "./components/empty-cart/empty-cart";
import {useContext} from "react";
import AppContext from "../../app-context/app-context";
import Summary from "./components/summary/summary";

const CustomShoppingCart = () => {
    const { state: { image: { size } } } = useContext(AppContext);

    if (size === 0) return <EmptyCart />;

    return(
        <Summary />
    )
}

export default CustomShoppingCart