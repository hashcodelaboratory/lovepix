import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../messages/messages";
import styles from "./order-detail.module.scss";
import { Box } from "@mui/material";
import { Order } from "../../../../../../../common/types/order";
import Image from "next/image";
import { ImageLayout } from "../../../../../../home/enums/enums";

type OrderDetailProps = {
  order?: Order;
}

const OrderDetail = ({ order }: OrderDetailProps): JSX.Element => {
  const { t } = useTranslation();

  console.log(order);

  return (
    <div className={styles.container}>
      <p><b>{t(messages.orders)}</b> {order?.id}</p>
      <div style={{ display: "flex", justifyContent: "space-between", height: 250 }}>
        <Box className={styles.box} style={{ width: "100%" }}>
          <h4>{t(messages.shoppingCart)}</h4>
          {order?.shoppingCart?.images?.map(image => (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} key={image.url}>
              <div>{image.qty} ks</div>
              <Image alt={image.url} src={image.url} width={40} height={40} layout={ImageLayout.FIXED} />
              <div>{image.material}</div>
              <div>{image.width}x{image.height}</div>
              <div>{image.price.toFixed(2)} €</div>
            </div>
          ))}
        </Box>
        <Box className={styles.box} style={{ width: 400 }}>
          <h4>{t("Order history")}</h4>
          <div>{new Date(order?.date ?? '').toLocaleDateString()}</div>
        </Box>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box className={styles.box} style={{ width: "100%", height: 160 }}>
          <h4>{t("Customer details")}</h4>
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