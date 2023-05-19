import styles from "../../order-detail.module.scss";
import { messages } from "../../../../../../../../../messages/messages";
import OrderDetailRow from "./components/order-detail-row";
import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Order } from "../../../../../../../../../common/types/order";

type Props = {
  order?: Order;
}

const OrderDetailShoppingCart = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation();

  return <Box className={styles.box} style={{ width: "100%" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h4>{t(messages.shoppingCart)}</h4>
      <h4>{Number(order?.totalPrice).toFixed(2)} €</h4>
    </div>
    {order?.shoppingCart?.images?.map((image, index) => (
      <OrderDetailRow key={index} index={index} image={image} order={order} />
    ))}
  </Box>;
};

export default OrderDetailShoppingCart;