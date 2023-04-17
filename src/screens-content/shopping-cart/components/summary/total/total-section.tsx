import styles from "../../../shopping-cart.module.scss";
import { messages } from "../../../../../messages/messages";
import { Link } from "@mui/material";
import { useTranslation } from "next-i18next";

type TotalSectionProps = {
  price?: number;
}

const TotalSection = ({ price }: TotalSectionProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3>{String(t(messages.summary))}</h3>
      </div>
      <div className={styles.totalContainer}>
        <p className={styles.summarySectionTitle}>
          {String(t(messages.total))}
        </p>
        <p className={styles.price}>
          {Number(price).toFixed(2)} €
        </p>
      </div>
      <p className={styles.text}>{String(t(messages.personalData))}</p>
      <Link className={styles.text} style={{ cursor: "pointer" }}>
        <b>{String(t(messages.privacy))}</b>
      </Link>
      <button
        type="submit"
        className={styles.checkoutButton}
      >
        {String(t(messages.orderWithPayment))}
      </button>
    </div>
  );
};

export default TotalSection;