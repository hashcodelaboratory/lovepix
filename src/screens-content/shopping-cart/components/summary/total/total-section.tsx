import styles from "../../../shopping-cart.module.scss";
import { messages } from "../../../../../messages/messages";
import { Link } from "@mui/material";
import { useTranslation } from "next-i18next";
import { FormInputs } from "common/types/form";
import {
  getDeliveryMessage,
  getPaymentMessage,
  getPriceForDelivery,
  getPriceForPayment,
} from "./utils";
import { Control, Controller } from "react-hook-form";

type TotalSectionProps = {
  control: Control<FormInputs>
  price?: number
  finalPrice: number
}

const TotalSection = ({ control, price, finalPrice }: TotalSectionProps): JSX.Element => {
  const { t } = useTranslation();

  const priceWithoutTax = price ? Number(finalPrice * 0.8).toFixed(2) : "-";
  const taxFromPrice = price ? Number(finalPrice * 0.2).toFixed(2) : "-";
  const finalPriceWithTax = (finalPrice).toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.summary))}</h3>
      </div>
      <Controller
        name="payment"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className={styles.totalContainer}>
            <span>
              {t(messages.payment)} - {getPaymentMessage(field.value)}
            </span>
            <span>{getPriceForPayment(field.value)} €</span>
          </div>
        )}
      />
      <Controller
        name="delivery"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className={styles.totalContainer}>
            <span>
              {t(messages.delivery)} - {t(String(getDeliveryMessage(field.value)))}
            </span>
            <span>{getPriceForDelivery(field.value)} €</span>
          </div>
        )}
      />
      <hr />
      <div className={styles.totalContainer}>
        <span>{String(t(messages.totalWithoutTax))}</span>
        <span>{priceWithoutTax} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span>{String(t(messages.tax))}</span>
        <span>{taxFromPrice} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span className={styles.summarySectionTitleFinalPrice}>
          {String(t(messages.total))}
        </span>
        <span className={styles.price}>{finalPriceWithTax} €</span>
      </div>
      <p className={styles.text}>{String(t(messages.personalData))}</p>
      <Link className={styles.text} style={{ cursor: "pointer" }}>
        <b>{String(t(messages.privacy))}</b>
      </Link>
      <button type="submit" className={styles.checkoutButton}>
        {String(t(messages.orderWithPayment))}
      </button>
    </div>
  );
};

export default TotalSection;
