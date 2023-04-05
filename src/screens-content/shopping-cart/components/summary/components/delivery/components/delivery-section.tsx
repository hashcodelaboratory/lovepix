import styles from "../../../../../shopping-cart.module.scss";
import { messages } from "../../../../../../../messages/messages";
import { Control, Controller } from "react-hook-form";
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";
import { Delivery as DeliveryOptions } from "../../../../../../../common/enums/delivery";
import { useTranslation } from "next-i18next";
import { FormInputs } from "../../../../../../../common/types/form";

type DeliverySectionProps = {
  message?: string;
  control: Control<FormInputs>;
}

const DeliverySection = ({ control, message }: DeliverySectionProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <p className={styles.summarySectionTitle}>
        {String(t(messages.delivery))}
      </p>
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
              <FormControlLabel value={DeliveryOptions.COURIER} control={<Radio />}
                                label={
                <div className={styles.radioGroupLabel}>
                  {String(t(messages.courier))}
                  <p className={styles.priceBox}>5.00 €</p>
                </div>
              }  />
              <FormControlLabel value={DeliveryOptions.PERSONAL_COLLECT} control={<Radio />}
                                label={
                <div className={styles.radioGroupLabel}>
                  {String(t(messages.personalCollect))}:
                  <p className={styles.priceBox}>{String(t(messages.free))}</p>
                </div>
              } />
            </RadioGroup>
            {message && (
              <FormHelperText error>
                {String(t(message))}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </>
  );
};

export default DeliverySection;