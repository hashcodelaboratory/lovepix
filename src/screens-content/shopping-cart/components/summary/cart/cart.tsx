import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import Button from "@mui/material/Button";

const Cart = () => {
    const { state: { image: { url, status } } } = useContext(AppContext);

    return (
        <div className={styles.cartContainer}>
            <h1>Shoping cart</h1>
            <p className={styles.itemsSize}>3 items</p>
            <hr />
            <Button className={styles.backButton}>Back to shop</Button>
        </div>
    )
}

export default Cart