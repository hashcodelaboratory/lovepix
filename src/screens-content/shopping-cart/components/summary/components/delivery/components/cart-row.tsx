import styles from "../../../../../shopping-cart.module.scss";
import { default as ImageComponent } from "next/image";
import { ImageLayout } from "../../../../../../home/enums/enums";
import { AddCircle, Close, RemoveCircle } from "@mui/icons-material";
import { Image, Order } from "../../../../../../../common/types/order";
import { removeImage } from "../utils/utils";

type CartRowProps = {
  order: Order;
  image: Image;
}

const CartRow = ({ image, order }: CartRowProps): JSX.Element => {
  return (
    <div className={styles.cartRow} key={image.origin}>
      <div>
        <ImageComponent
          alt={image?.url}
          src={image?.url ?? ""}
          width={30}
          height={30}
          layout={ImageLayout.FIXED}
        />
        <p className={styles.cartRowDescription}>{`${image?.material} (${image?.width} x ${image?.height})`}</p>
      </div>
      <div className={styles.qtyContainer}>
        <RemoveCircle sx={{ width: 16 }} />
        <p className={styles.qtyField}>{image?.qty} </p>
        <AddCircle sx={{ width: 16 }} />
      </div>
      <div>{Number(image?.price).toFixed(2)} €</div>
      <Close color="error" onClick={() => removeImage(image?.url, order.shoppingCart?.images)} />
    </div>
  );
};

export default CartRow;