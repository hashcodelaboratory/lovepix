import styles from "../../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { FieldErrors, Control } from "react-hook-form";
import { Image, Order } from "../../../../../../common/types/order";
import { FormInputs } from "../../../../../../common/types/form";
import CartRow from "./components/cart-row";
import DeliverySection from "./components/delivery-section";
import PaymentSection from "./components/payment-section";
import CouponSection from "./components/coupon-section";
import TotalSection from "./components/total-section";

type DeliveryProps = {
  order: Order;
  register: any;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
}

const Delivery = ({ order, control, errors }: DeliveryProps) => {
  const { t } = useTranslation();

  const { images } = order?.shoppingCart;

  const items = images?.map((image: Image) =>
    <CartRow key={image.url} image={image} order={order} />,
  );

  return (
    <div className={styles.deliveryContainer}>
      <h3>{String(t(messages.singleOrder))}</h3>
      <hr />
      <div className={styles.totalContainer}>
        {items}
      </div>
      <DeliverySection control={control} message={errors.delivery?.message} />
      <CouponSection />
      <PaymentSection control={control} message={errors.payment?.message} />
      <TotalSection price={order?.totalPrice} />
      <button
        type="submit"
        className={styles.checkoutButton}
      >
        {String(t(messages.checkout))}
      </button>
    </div>
  );
};

export default Delivery;
