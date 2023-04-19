import styles from "../../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { FieldErrors, Control } from "react-hook-form";
import { Image, Order } from "../../../../../../common/types/order";
import { FormInputs } from "../../../../../../common/types/form";
import CartRow from "./components/cart-row";

type DeliveryProps = {
  order: Order;
  register: any;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
}

const OrderItems = ({ order }: DeliveryProps) => {
  const { t } = useTranslation();

  const { images } = order?.shoppingCart;

  const items = images?.map((image: Image) =>
    <CartRow key={image.url} image={image} order={order} />,
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.singleOrder))}</h3>
      </div>
      <div className={styles.cartItemsContainer}>
        {items}
      </div>
    </div>
  );
};

export default OrderItems;
