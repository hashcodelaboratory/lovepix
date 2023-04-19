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

type SummaryProps = {
  order: Order;
}

const Summary = ({ order }: SummaryProps) => {
  const { mutate: createOrder } = useCreateOrder();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(FORM_SCHEMA),
    defaultValues: { ...order },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    await createOrder({
      form: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        company: data?.company,
        address: data?.address,
        city: data?.city,
        postalCode: data?.postalCode,
        phone: data?.phone,
        email: data?.email,
      },
      date: Date.now(),
      shoppingCart: order?.shoppingCart,
      totalPrice: order?.totalPrice,
      delivery: data.delivery!,
      payment: data.payment!,
    });
    reset();
  };

  useEffect(() => {
    if (!order?.shoppingCart?.images) {
      setIsLoading(false);
    }
  }, [order]);

  return (
    <Container className={styles.summaryContainer}>
      <form className={styles.summary} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Address register={register} errors={errors} control={control} />
          <Voucher />
        </div>
        <div className={styles.summaryColumn}>
          <OrderItems order={order} register={register} errors={errors} control={control} />
          <Delivery control={control} message={errors.delivery?.message} />
          <Payment control={control} message={errors.payment?.message} />
        </div>
        <div className={styles.summaryTotalContainer}>
          <TotalSection price={order?.totalPrice} />
        </div>
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
