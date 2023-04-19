import styles from "../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../messages/messages";
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FormInputs } from "../../../../../common/types/form";
import { Payment as PaymentEnum } from "../../../../../common/enums/payment";

type DeliverySectionProps = {
  message?: string;
  control: Control<FormInputs>;
}

const Payment = ({ control, message }: DeliverySectionProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.payment))}</h3>
      </div>
      <Controller
        name="payment"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl fullWidth error={!!message}>
            <RadioGroup
              {...field}
              onChange={field.onChange}
            >
              <FormControlLabel
                value={PaymentEnum.ONLINE}
                control={<Radio />}
                label={
                  <div className={styles.radioGroupLabel}>
                    <p className={styles.paymentBox}>{String(t(messages.online))}</p>
                    <p className={styles.deliveryLightText}>{String(t(messages.free))}</p>
                  </div>
                }
                className={styles.deliveryField}
              />
              <FormControlLabel
                value={PaymentEnum.PERSONAL_DELIVERY}
                control={<Radio />}
                label={
                  <div className={styles.radioGroupLabel}>
                    <p className={styles.paymentBox}>{String(t(messages.personalDelivery))}</p>
                    <p className={styles.deliveryLightText}>2.00 €</p>
                  </div>
                }
                className={styles.deliveryField}
              />
              <FormControlLabel
                value={PaymentEnum.TRANSACTION}
                control={<Radio />}
                label={
                  <div className={styles.radioGroupLabel}>
                    <b>{String(t(messages.transaction))}</b>
                  </div>
                }
                className={styles.deliveryField}
              />
            </RadioGroup>
            {message && (
              <FormHelperText error>
                {String(t(message))}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </div>
  );
};

export default Payment;
