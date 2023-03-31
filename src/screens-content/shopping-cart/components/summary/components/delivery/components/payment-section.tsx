import styles from "../../../../../shopping-cart.module.scss";
import { messages } from "../../../../../../../messages/messages";
import { Control, Controller } from "react-hook-form";
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";
import { Payment } from "../../../../../../../common/enums/payment";
import { useTranslation } from "next-i18next";
import { FormInputs } from "../../../../../../../common/types/form";

type PaymentSectionProps = {
  message?: string;
  control: Control<FormInputs>;
}

const PaymentSection = ({ control, message }: PaymentSectionProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <p className={styles.summarySectionTitle}>
        {String(t(messages.payment))}
      </p>
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
              <FormControlLabel value={Payment.ONLINE} control={<Radio />} label={String(t(messages.online))} />
              <FormControlLabel value={Payment.PERSONAL_DELIVERY} control={<Radio />}
                                label={String(t(messages.personalDelivery))}
              />
              <FormControlLabel value={Payment.TRANSACTION} control={<Radio />}
                                label={String(t(messages.transaction))} />
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

export default PaymentSection;