import styles from "../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../messages/messages";
import Form from "../components/form/form";
import { useRouter } from "next/router";
import {  Order } from "../../../../../common/types/order";

type CartProps = {
  order: Order;
}

const Cart = ({ order }: CartProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const content = <Form order={order} />;

  const redirect = () => {
    router.push("/");
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3>{String(t(messages.shoppingCart))}</h3>
        <h3 className={styles.cartTitleDivider}> {" > "} </h3>
        <h3 className={styles.cartDisabledTitle}>{String(t(messages.personalDataTitle))}</h3>
      </div>
      <hr />
      {content}
      <button onClick={redirect} className={styles.backButton}>
        {String(t("back"))}
      </button>
    </div>
  );
};

export default Cart;
