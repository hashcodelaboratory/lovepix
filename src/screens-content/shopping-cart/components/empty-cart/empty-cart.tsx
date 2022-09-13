import {ShoppingCart} from "@mui/icons-material";
import styles from '../../shopping-cart.module.scss';
import {Container} from "@mui/material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";


const EmptyCart = () => {

    const { t } = useTranslation();

    return (
        <Container >
            <div className={styles.emptyCartContainer}>
                <ShoppingCart className={styles.icon} />
                <p className={styles.title}>{String(t(messages.emptyCart))}</p>
            </div>
        </Container>
    )
}

export default EmptyCart