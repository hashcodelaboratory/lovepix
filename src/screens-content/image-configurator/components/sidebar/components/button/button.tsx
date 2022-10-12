import styles from '../../../../image-configurator-layout.module.scss';
import {ShoppingCart} from "@mui/icons-material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../../messages/messages";

const Button = () => {

    const { t } = useTranslation()

    return(
        <div className={styles.containerPadding}>
            <button className={styles.button}>
                <ShoppingCart />
                <p className={styles.buttonTitle}>{String(t(messages.order))}</p>
            </button>
        </div>
    )
}

export default Button