import styles from "../../../../shopping-cart.module.scss";
import { useContext, useEffect } from "react";
import AppContext from "../../../../../../app-context/app-context";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import {
  FormControl,
  FormHelperText,
  Link,
  Select,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SUMMARY_SCHEMA } from "./utils/schema";
import { Delivery as DeliveryOptions } from "../../../../../../common/enums/delivery";
import { Summary } from "../../../../../../common/types/summary";
import { useLiveQuery } from "dexie-react-hooks";
import { orderTable } from "../../../../../../../database.config";
import { Payment } from "../../../../../../common/enums/payment";

const Delivery = () => {
  const order = useLiveQuery(() => orderTable.get("order"), []);

  const {
    state: { stepper },
    stateAction: { setStepper },
  } = useContext(AppContext);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Summary>({
    resolver: yupResolver(SUMMARY_SCHEMA),
    defaultValues: { ...order?.summary },
  });

  useEffect(() => {
    stepper === 3 && reset();
  }, [stepper, reset]);

  const onSubmit: SubmitHandler<Summary> = (data) => {
    orderTable.update("order", {
      delivery: data?.delivery,
      payment: data?.payment,
    });
    setStepper(1);
  };

  return (
    <div className={styles.deliveryContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{String(t(messages.summary))}</h2>
        <hr />
        <div className={styles.totalContainer}>
          <p>
            {order?.shoppingCart?.images?.length} {String(t(messages.items))}
          </p>
          <p>{Number(order?.totalPrice).toFixed(2)} €</p>
        </div>
        <p className={styles.summarySectionTitle}>
          {String(t(messages.delivery))}
        </p>
        <Controller
          name='delivery'
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.delivery?.message}>
              <Select {...field} {...register("delivery", { required: true })}>
                <MenuItem value={DeliveryOptions.COURIER}>
                  {String(t(messages.courier))}
                </MenuItem>
                <MenuItem value={DeliveryOptions.PERSONAL_COLLECT}>
                  {String(t(messages.personalCollect))}
                </MenuItem>
                <MenuItem value={DeliveryOptions.PICKUP}>
                  {String(t(messages.pickup))}
                </MenuItem>
              </Select>
              {errors.delivery?.message && (
                <FormHelperText error>
                  {String(t(errors.delivery?.message))}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <p className={styles.summarySectionTitle}>{String(t(messages.code))}</p>
        <TextField className={styles.codeField} placeholder='WALLER22' />
        <p className={styles.summarySectionTitle}>
          {String(t(messages.payment))}
        </p>
        <Controller
          name='payment'
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.payment?.message}>
              <Select {...field} {...register("payment", { required: true })}>
                <MenuItem value={Payment.ONLINE}>
                  {String(t(messages.online))}
                </MenuItem>
                <MenuItem value={Payment.PERSONAL_DELIVERY}>
                  {String(t(messages.personalDelivery))}
                </MenuItem>
              </Select>
              {errors.payment?.message && (
                <FormHelperText error>
                  {String(t(errors.payment?.message))}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <div className={styles.totalContainer}>
          <p className={styles.summarySectionTitle}>
            {String(t(messages.total))}
          </p>
          <p className={styles.price}>
            {Number(order?.totalPrice).toFixed(2)} €
          </p>
        </div>
        <p className={styles.text}>{String(t(messages.personalData))}</p>
        <Link className={styles.text} style={{ cursor: "pointer" }}>
          <b>{String(t(messages.privacy))}</b>
        </Link>
        <button
          type='submit'
          className={styles.checkoutButton}
          disabled={stepper === 1}
        >
          {String(t(messages.checkout))}
        </button>
      </form>
    </div>
  );
};

export default Delivery;
