import styles from "../../../../../shopping-cart.module.scss";
import { default as ImageComponent } from "next/image";
import { ImageLayout } from "../../../../../../home/enums/enums";
import { Close } from "@mui/icons-material";
import { Image, Order } from "../../../../../../../common/types/order";
import { removeImage, updateQuantity, UpdateQuantityWay } from "../utils/utils";

type CartRowProps = {
  order: Order;
  image: Image;
}

const CartRow = ({ image, order }: CartRowProps): JSX.Element => {
  return (
    <div className={styles.cartRow} key={image.origin}>
      <div className={styles.cartRowThumbnailContainer}>
        <ImageComponent
          alt={image?.url}
          src={image?.url ?? ""}
          width={60}
          height={60}
          layout={ImageLayout.FIXED}
        />
        <div>
          <p className={styles.cartRowDescription}>
            <div>{image?.material}</div>
            <div>{`${image?.width} x ${image?.height}`}</div>
          </p>
          <div className={styles.qtyContainer}>
            <div
              className={styles.cartRowRemove}
              onClick={() => updateQuantity(UpdateQuantityWay.DECREASE, order, image)}
            >
              -
            </div>
            <p className={styles.qtyField}>{image?.qty} </p>
            <div
              className={styles.cartRowRemove}
              onClick={() => updateQuantity(UpdateQuantityWay.INCREASE, order, image)}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cartRowPrice}>{Number(image?.qty * image?.price).toFixed(2)} €</div>
      <Close
        className={styles.cartRowClose}
        color="error"
        onClick={() => removeImage(image?.url, order.shoppingCart?.images)}
      />
    </div>
  );
};

export default CartRow;