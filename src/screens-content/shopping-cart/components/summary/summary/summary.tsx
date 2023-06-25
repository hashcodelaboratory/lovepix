import styles from "../../../shopping-cart.module.scss";
import { Container } from "@mui/system";
import Address from "../address/address";
import { Order } from "../../../../../common/types/order";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../../../../../common/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FORM_SCHEMA } from "../address/components/form/utils/schema";
import { useCreateOrder } from "../../../../../common/firebase/firestore/createOrder";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Voucher from "../voucher/voucher";
import Delivery from "../delivery/delivery";
import Payment from "../payment/payment";
import OrderItems from "../components/order-items/order-items";
import TotalSection from "../total/total-section";
import { getPriceForDelivery, getPriceForPayment } from "../total/utils";
import { useStripe } from "@stripe/react-stripe-js";

type SummaryProps = {
  order: Order
}

const Summary = ({ order }: SummaryProps) => {
  const { mutate: createOrder } = useCreateOrder();

  const stripe = useStripe();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(FORM_SCHEMA),
    defaultValues: { ...order },
  });
  const { delivery, payment } = watch();
  const finalPrice = Number(order?.totalPrice) + getPriceForDelivery(delivery) + getPriceForPayment(payment);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    // await createOrder({
    //   form: {
    //     firstName: data?.firstName,
    //     lastName: data?.lastName,
    //     company: data?.company,
    //     address: data?.address,
    //     city: data?.city,
    //     postalCode: data?.postalCode,
    //     phone: data?.phone,
    //     email: data?.email,
    //   },
    //   date: Date.now(),
    //   shoppingCart: order?.shoppingCart,
    //   totalPrice: order?.totalPrice,
    //   delivery: data.delivery!,
    //   payment: data.payment!,
    // })
    // reset()
    const response = await fetch("api/checkout_sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
      },
    });
    const _data = await response.json();
    await stripe?.redirectToCheckout({
      sessionId: _data.sessionId});
  };

  console.log(stripe);

  useEffect(() => {
    if (!order?.shoppingCart?.images) {
      setIsLoading(false);
    }
  }, [order]);

  return (
    <Container className={styles.summaryContainer}>
      <form className={styles.summary} onSubmit={handleSubmit(onSubmit)}>
        <Address register={register} errors={errors} control={control} />
        <div className={styles.orderContainer}>
          <OrderItems
            order={order}
            register={register}
            errors={errors}
            control={control}
          />
          <TotalSection
            delivery={delivery}
            payment={payment}
            price={order?.totalPrice}
            finalPrice={finalPrice}
          />
        </div>
        <Voucher />
        <Delivery control={control} message={errors.delivery?.message} />
        <Payment control={control} message={errors.payment?.message} />
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Summary;
