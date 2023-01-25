import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../messages/messages";
import styles from "./order-detail.module.scss";
import { Box, Button } from "@mui/material";
import { Order } from "../../../../../../../common/types/order";
import Image from "next/image";
import { ImageLayout } from "../../../../../../home/enums/enums";
import { generatePdf } from "../utils/post-processing/generatePdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

type OrderDetailProps = {
  order?: Order;
}

const OrderDetail = ({ order }: OrderDetailProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p><b>{t(messages.orders)}</b> {order?.id}</p>
      <div className={styles.flex} style={{ height: 400 }}>
        <Box className={styles.box} style={{ width: "100%" }}>
          <h4>{t(messages.shoppingCart)}</h4>
          {order?.shoppingCart?.images?.map((image, index) => (
            <div className={styles.row} key={image.url}>
              <div className={styles.flex} style={{ justifyContent: "flex-start", alignItems: "center" }}>
                <p style={{ marginRight: 8 }}>{image.qty} ks</p>
                <a target="_blank" href={`${image.url}`} rel="noopener noreferrer">
                  <Image alt={image.url} src={image.url} width={40} height={40} layout={ImageLayout.FIXED} />
                </a>
              </div>
              <div>{image.material}</div>
              <div>{image.width}x{image.height}</div>
              <div>{image.price.toFixed(2)} €</div>
              {image.pdf ? <a target="_blank" href={image.pdf} rel="noopener noreferrer">
                <PictureAsPdfIcon color="error" />
              </a> : <Button variant="contained"
                             onClick={() => generatePdf(order?.shoppingCart?.images, index, image, order.id)}>PDF</Button>}
            </div>
          ))}
        </Box>
        <Box className={styles.box} style={{ width: 400 }}>
          <h4>{t("Order history")}</h4>
          <div>{new Date(order?.date ?? "").toLocaleDateString()}</div>
        </Box>
      </div>
      <div className={styles.flex}>
        <Box className={styles.box} style={{ width: "100%", height: 200 }}>
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