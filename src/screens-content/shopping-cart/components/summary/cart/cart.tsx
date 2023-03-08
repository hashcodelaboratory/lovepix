import styles from "../../../shopping-cart.module.scss";
import { useContext } from "react";
import AppContext from "../../../../../app-context/app-context";
import Button from "@mui/material/Button";
import Image from "next/image";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../messages/messages";
import Form from "../components/form/form";
import { useRouter } from "next/router";
import { orderTable } from "../../../../../../database.config";
import { Order } from "../../../../../common/types/order";
import { ORDER_TABLE_KEY } from "../../../../../common/indexed-db/hooks/keys";

type CartProps = {
  order: Order;
}

const Cart = ({ order }: CartProps) => {
  const {
    state: { stepper },
    stateAction: { setStepper },
  } = useContext(AppContext);

  const { images } = order?.shoppingCart;

  const { t } = useTranslation();

  const router = useRouter();

  const removeImage = async (url?: string) => {
    if (order?.shoppingCart?.images.length === 1) {
      orderTable.clear();
    } else {
      orderTable.update(ORDER_TABLE_KEY, {
        shoppingCart: {
          images: order?.shoppingCart?.images.filter(
            (image: any) => image.url !== url,
          ),
        },
      });
    }
  };

  const items = images &&
    images.map((image: any) =>
      <>
        <div className={styles.cartRow}>
          <Image
            alt={image?.image}
            src={image?.url ?? ""}
            width={80}
            height={80}
            layout="fixed"
          />
          <div>{`${image?.material} (${image?.width} x ${image?.height})`}</div>
          <div className={styles.qtyContainer}>
            <Button>-</Button>
            <TextField className={styles.qtyField} value={image?.qty} />
            <Button>+</Button>
          </div>
          <div>{Number(image?.price).toFixed(2)} €</div>
          <Button onClick={() => removeImage(image?.url)}>
            <CloseIcon color="error" />
          </Button>
        </div>
        <hr />
      </>);


  const isDefault = stepper === 0;

  const content = isDefault ? items : <Form order={order} />;

  const redirect = () => {
    isDefault ? router.push("/") : setStepper(0);
  };

  const backButtonTitle = isDefault
    ? messages.backToShop
    : messages.shoppingCart;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={!isDefault ? styles.cartDisabledTitle : undefined}>
          {String(t(messages.shoppingCart))}
        </h3>
        <h3 className={styles.cartTitleDivider}> {" > "} </h3>
        <h3 className={isDefault ? styles.cartDisabledTitle : undefined}>
          {String(t(messages.personalDataTitle))}
        </h3>
      </div>
      <p className={styles.itemsSize}>
        {images?.length} {String(t(messages.items))}
      </p>
      <hr />
      {content}
      <button onClick={redirect} className={styles.backButton}>
        {String(t(backButtonTitle))}
      </button>
    </div>
  );
};

export default Cart;
