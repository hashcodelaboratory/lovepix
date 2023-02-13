import styles from "../../order-detail.module.scss";
import { messages } from "../../../../../../../../../messages/messages";
import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Order } from "../../../../../../../../../common/types/order";

type Props = {
  order?: Order;
}

const OrderDetailHistory = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation();

  return <Box className={styles.box} style={{ width: 400 }}>
    <h4>{t(messages.orderHistory)}</h4>
    <div>{new Date(order?.date ?? "").toLocaleDateString()}</div>
  </Box>;
};

export default OrderDetailHistory;