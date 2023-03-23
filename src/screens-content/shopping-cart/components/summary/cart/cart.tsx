import styles from "../../../shopping-cart.module.scss";
import { useContext } from "react";
import AppContext from "../../../../../app-context/app-context";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../messages/messages";
import Form from "../components/form/form";
import { useRouter } from "next/router";
import {  Order } from "../../../../../common/types/order";

type CartProps = {
  order: Order;
}

const Cart = ({ order }: CartProps) => {
  const {
    state: { stepper },
    stateAction: { setStepper },
  } = useContext(AppContext);

  const { t } = useTranslation();

  const router = useRouter();

  const isDefault = stepper === 0;

  const content = <Form order={order} />;

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
      <hr />
      {content}
      <button onClick={redirect} className={styles.backButton}>
        {String(t(backButtonTitle))}
      </button>
    </div>
  );
};

export default Cart;
