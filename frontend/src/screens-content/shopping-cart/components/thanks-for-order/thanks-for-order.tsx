import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import { messages } from "../../../../messages/messages";
import styles from "../../shopping-cart.module.scss";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";

const ThanksForOrder = () => {
  const { t } = useTranslation();

  const { thanks, forOrder, backToShop, orderInfo, thanksContact } = messages;

  const { push } = useRouter();

  const navigate = () => {
    push("/");
  };

  return (
    <Container>
      <div className={styles.thanksContainer}>
        <ShoppingCart className={styles.thanksIcon} />
        <h1 className={styles.thanksTitle}>{String(t(thanks))}</h1>
        <h1 className={styles.thanksSubTitle}>{String(t(forOrder))}</h1>
        <p className={styles.thanksContent}>{String(t(orderInfo))}</p>
        <button className={styles.thanksButton} onClick={navigate}>
          {String(t(backToShop))}
        </button>
        <p className={styles.thanksLight}>{String(t(thanksContact))}</p>
      </div>
    </Container>
  );
};

export default ThanksForOrder;
