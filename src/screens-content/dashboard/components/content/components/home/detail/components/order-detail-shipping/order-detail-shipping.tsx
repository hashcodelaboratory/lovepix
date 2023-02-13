import styles from "../../order-detail.module.scss";
import { messages } from "../../../../../../../../../messages/messages";
import { Box } from "@mui/material";
import { Order } from "../../../../../../../../../common/types/order";
import { useTranslation } from "next-i18next";

type Props = {
  order?: Order;
}

const OrderDetailShipping = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation();

  return <Box className={styles.box} style={{ width: 400 }}>
    <h4>{t(messages.shipping)}</h4>
    <div>{order?.form?.address} {order?.form?.city} {order?.form?.postalCode}</div>
  </Box>;
};

export default OrderDetailShipping;