import styles from "../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../messages/messages";
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";
import { Delivery as DeliveryOptions } from "../../../../../common/enums/delivery";
import { Control, Controller } from "react-hook-form";
import { FormInputs } from "../../../../../common/types/form";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HailIcon from '@mui/icons-material/Hail';

type DeliverySectionProps = {
  message?: string;
  control: Control<FormInputs>;
}

const Delivery = ({ control, message }: DeliverySectionProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.delivery))}</h3>
      </div>
      <Controller
        name="delivery"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl fullWidth error={!!message}>
            <RadioGroup
              {...field}
              onChange={field.onChange}
              value={field.value}
            >
              <FormControlLabel
                value={DeliveryOptions.COURIER}
                control={<Radio />}
                label={
                  <div className={styles.radioGroupLabel}>
                    <p className={styles.priceBox}>5.00 €</p>
                    <div className={styles.deliveryLightText}>{String(t(messages.courier))}</div>
                    <LocalShippingIcon className={styles.deliveryIcon} />
                  </div>
                }
                className={styles.deliveryField} />
              <FormControlLabel
                value={DeliveryOptions.PERSONAL_COLLECT}
                control={<Radio />}
                label={
                  <div className={styles.radioGroupLabel}>
                    <p className={styles.priceBox}>{String(t(messages.free))}</p>
                    <div className={styles.deliveryLightText}>{String(t(messages.personalCollect))}</div>
                    <HailIcon className={styles.deliveryIcon} />
                  </div>
                }
                className={styles.deliveryField} />
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

export default Delivery;
