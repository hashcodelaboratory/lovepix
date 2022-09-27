import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import Button from "@mui/material/Button";
import Image from "next/image";
import {TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";

const Cart = () => {
    const { state: { image: { url, size } } } = useContext(AppContext);

    const { t } = useTranslation();

    const items =
        <>
            <div className={styles.cartRow}>
                <Image alt={url} src={url ?? ''} width={80} height={80} layout="fixed" />
                <div>Konfiguracia</div>
                <div className={styles.qtyContainer}>
                    <Button>-</Button>
                    <TextField className={styles.qtyField} value={1} />
                    <Button>+</Button>
                </div>
                <div>€ 17.99</div>
                <Button><CloseIcon color="error" /></Button>
            </div>
            <hr/>
        </>

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartTitleContainer}>
                <h1>{String(t(messages.shoppingCart))} </h1>
                <h1 className={styles.cartTitleDivider}> {' > '} </h1>
                <h1 className={styles.cartDisabledTitle}>{String(t(messages.shoppingCart))} </h1>
            </div>
            <p className={styles.itemsSize}>{size} {String(t(messages.items))}</p>
            <hr />
            {items}
            <Button className={styles.backButton}>{String(t(messages.backToShop))}</Button>
        </div>
    )
}

export default Cart