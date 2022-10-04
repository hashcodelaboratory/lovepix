import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import Button from "@mui/material/Button";
import Image from "next/image";
import {TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";
import Form from "../form/form";
import {useRouter} from "next/router";
import {ImageStatus} from "../../../../../app-context/imageStatus";

const Cart = () => {
    const { state: { image: { url, size }, stepper }, stateAction: { setImage } } = useContext(AppContext);

    const { t } = useTranslation();

    const router = useRouter();

    const removeImage = () => {
        setImage({
            url: undefined,
            status: ImageStatus.DEFAULT,
            size: 0
        });
    }

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
                <Button onClick={removeImage}><CloseIcon color="error" /></Button>
            </div>
            <hr/>
        </>

    const isDefault = stepper === 0;

    const content = isDefault ? items : <Form />;

    const redirect = () => router.push("/");

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartTitleContainer}>
                <h1 className={isDefault ? undefined : styles.cartDisabledTitle}>
                    {String(t(messages.shoppingCart))}
                </h1>
                <h1 className={styles.cartTitleDivider}> {' > '} </h1>
                <h1 className={isDefault ? styles.cartDisabledTitle : undefined}>
                    {String(t(messages.personalDataTitle))}
                </h1>
            </div>
            <p className={styles.itemsSize}>{size} {String(t(messages.items))}</p>
            <hr />
            {content}
            <button onClick={redirect} className={styles.backButton}>{String(t(messages.backToShop))}</button>
        </div>
    )
}

export default Cart