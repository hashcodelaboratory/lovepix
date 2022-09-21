import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import Button from "@mui/material/Button";
import Image from "next/image";

const Cart = () => {
    const { state: { image: { url } } } = useContext(AppContext);

    const items =
        <div className={styles.cartRow}>
            <Image alt={url} src={url ?? ''} width={80} height={80} layout="fixed" />
            <div>Konfiguracia</div>
            <div>+ 1 -</div>
            <div>17.99 eur</div>
            <div>x</div>
        </div>

    return (
        <div className={styles.cartContainer}>
            <h1>Shoping cart</h1>
            <p className={styles.itemsSize}>3 items</p>
            <hr />
            {items}
            <Button className={styles.backButton}>Back to shop</Button>
        </div>
    )
}

export default Cart