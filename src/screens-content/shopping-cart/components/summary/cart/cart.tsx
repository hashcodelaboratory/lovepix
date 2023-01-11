import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext, {ShoppingCartImage} from "../../../../../app-context/app-context";
import Button from "@mui/material/Button";
import Image from "next/image";
import {TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";
import Form from "../components/form/form";
import {useRouter} from "next/router";
import {useUpdateOrder} from "../../../../home/api/order/useUpdateOrder";
import {ORDER_KEY} from "../../../../home/api/order/utils/keys";
import {useQueryClient} from "react-query";

const Cart = () => {
    const { state: { shoppingCart, stepper }, stateAction: { setStepper } } = useContext(AppContext);

    const images = shoppingCart?.images ?? [{} as ShoppingCartImage];

    const { t } = useTranslation();

    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate: updateOrder } = useUpdateOrder();

    const removeImage = async (title?: string) => {
        const filtered = images.filter(image => image.name !== title);
        await updateOrder({
            shoppingCart: filtered.length === 0 ? null : {
                images: filtered
            }
        });
        await queryClient.invalidateQueries(ORDER_KEY);
    }

    const items =
        images && images.map((image) => <>
            <div className={styles.cartRow}>
                <Image alt={image?.url} src={image?.url ?? ''} width={80} height={80} layout="fixed" />
                <div>{image?.name}</div>
                <div className={styles.qtyContainer}>
                    <Button>-</Button>
                    <TextField className={styles.qtyField} value={image?.qty} />
                    <Button>+</Button>
                </div>
                <div>{Number(image?.price).toFixed(2)} €</div>
                <Button onClick={() => removeImage(image?.name)}><CloseIcon color="error" /></Button>
            </div>
            <hr/>
        </>
        )

    const isDefault = stepper === 0;

    const content = isDefault ? items : <Form />;

    const redirect = () => {
        isDefault ? router.push("/") : setStepper(0);
    }

    const backButtonTitle = isDefault ? messages.backToShop : messages.shoppingCart;

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
            <p className={styles.itemsSize}>{images?.length} {String(t(messages.items))}</p>
            <hr />
            {content}
            <button onClick={redirect} className={styles.backButton}>{String(t(backButtonTitle))}</button>
        </div>
    )
}

export default Cart