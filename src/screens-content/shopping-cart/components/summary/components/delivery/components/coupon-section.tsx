import styles from "../../../../../shopping-cart.module.scss";
import { messages } from "../../../../../../../messages/messages";
import { TextField } from "@mui/material";
import { useTranslation } from "next-i18next";

const CouponSection = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <p className={styles.summarySectionTitle}>{String(t(messages.code))}</p>
      <TextField className={styles.codeField} placeholder="WALLER22" />
    </>
  );
};

export default CouponSection;