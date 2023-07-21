import styles from "../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { localizationKey } from "../../../../../localization/localization-key";
import { TextField } from "@mui/material";

const Voucher = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(localizationKey.code))}</h3>
      </div>
      <div classname={styles.voucherRow}>
      <TextField
        className={styles.voucherTextField}
        label={String(t(localizationKey.code))}
        placeholder="WALLER22"
        InputLabelProps={{ shrink: true }}
        size="small"
      />
        <Button variant='contained'>{String(t(localizationKey.add))}</Button>
      </div>
    </div>
  );
};

export default Voucher;
