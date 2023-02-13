import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../messages/messages";
import styles from "./order-detail.module.scss";
import { Box } from "@mui/material";
import { Order } from "../../../../../../../common/types/order";
import OrderDetailRow from "./components/order-detail-row";

type OrderDetailProps = {
  order?: Order;
}

const OrderDetail = ({ order }: OrderDetailProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p><b>{t(messages.singleOrder)}</b> {order?.id}</p>
      <div className={styles.flex} style={{ height: 400 }}>
        <Box className={styles.box} style={{ width: "100%" }}>
          <h4>{t(messages.shoppingCart)}</h4>
          {order?.shoppingCart?.images?.map((image, index) => (
            <OrderDetailRow key={index} index={index} image={image} order={order} />
          ))}
        </Box>
        <Box className={styles.box} style={{ width: 400 }}>
          <h4>{t(messages.orderHistory)}</h4>
          <div>{new Date(order?.date ?? "").toLocaleDateString()}</div>
        </Box>
      </div>
      <div className={styles.flex}>
        <Box className={styles.box} style={{ width: "100%", height: 200 }}>
          <h4>{t(messages.customerDetails)}</h4>
          <div>{order?.form?.firstName} {order?.form?.lastName}</div>
          <div>{order?.form?.email}</div>
          <div>{order?.form?.phone}</div>
        </Box>
        <Box className={styles.box} style={{ width: 400 }}>
          <h4>{t(messages.shipping)}</h4>
          <div>{order?.form?.address} {order?.form?.city} {order?.form?.postalCode}</div>
        </Box>
      </div>
    </div>
  );
};

export default OrderDetail;