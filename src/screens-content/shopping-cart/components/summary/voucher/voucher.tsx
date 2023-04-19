import styles from "../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../messages/messages";
import { TextField } from "@mui/material";

const Voucher = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.code))}</h3>
      </div>
      <TextField
        className={styles.formField}
        label={String(t(messages.code))}
        placeholder="WALLER22"
        InputLabelProps={{ shrink: true }}
        size="small"
      />
    </div>
  );
};

export default Voucher;
