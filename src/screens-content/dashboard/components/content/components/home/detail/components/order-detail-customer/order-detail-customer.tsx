import styles from "../../order-detail.module.scss";
import { messages } from "../../../../../../../../../messages/messages";
import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Order } from "../../../../../../../../../common/types/order";

type Props = {
  order?: Order;
}

const OrderDetailCustomer = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation();

  return <Box className={styles.box} style={{ width: "100%", height: 200 }}>
    <h4>{t(messages.customerDetails)}</h4>
    <div>{order?.form?.firstName} {order?.form?.lastName}</div>
    <div>{order?.form?.email}</div>
    <div>{order?.form?.phone}</div>
  </Box>;
};

export default OrderDetailCustomer;