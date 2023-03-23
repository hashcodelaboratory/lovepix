import styles from "../../../../shopping-cart.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import {
  FormControl, FormControlLabel,
  FormHelperText,
  Link, Radio, RadioGroup,
  TextField,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SUMMARY_SCHEMA } from "./utils/schema";
import { Delivery as DeliveryOptions } from "../../../../../../common/enums/delivery";
import { Summary } from "../../../../../../common/types/summary";
import { orderTable } from "../../../../../../../database.config";
import { Payment } from "../../../../../../common/enums/payment";
import { Image, Order } from "../../../../../../common/types/order";
import { default as ImageComponent } from "next/image";
import { ImageLayout } from "../../../../../home/enums/enums";
import { AddCircle, Close, RemoveCircle } from "@mui/icons-material";
import { ORDER_TABLE_KEY } from "../../../../../../common/indexed-db/hooks/keys";

type DeliveryProps = {
  order: Order;
}

const Delivery = ({ order }: DeliveryProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Summary>({
    resolver: yupResolver(SUMMARY_SCHEMA),
    defaultValues: { ...order },
  });

  const onSubmit: SubmitHandler<Summary> = (data) => {
    orderTable.update("order", {
      delivery: data?.delivery,
      payment: data?.payment,
    });
  };

  const { images } = order?.shoppingCart;

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
    images.map((image: Image) =>
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
        <Close color="error" onClick={() => removeImage(image?.url)} />
      </div>,
    );

  return (
    <div className={styles.deliveryContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{String(t(messages.summary))}</h3>
        <hr />
        <div className={styles.totalContainer}>
          {items}
        </div>
        <p className={styles.summarySectionTitle}>
          {String(t(messages.delivery))}
        </p>
        <Controller
          name="delivery"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.delivery?.message}>
              <RadioGroup
                {...field} {...register("delivery")}
                onChange={field.onChange}
              >
                <FormControlLabel value={DeliveryOptions.COURIER} control={<Radio />}
                                  label={String(t(messages.courier))} />
                <FormControlLabel value={DeliveryOptions.PERSONAL_COLLECT} control={<Radio />}
                                  label={String(t(messages.personalCollect))} />
              </RadioGroup>
              {errors.delivery?.message && (
                <FormHelperText error>
                  {String(t(errors.delivery?.message))}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <p className={styles.summarySectionTitle}>{String(t(messages.code))}</p>
        <TextField className={styles.codeField} placeholder="WALLER22" />
        <p className={styles.summarySectionTitle}>
          {String(t(messages.payment))}
        </p>
        <Controller
          name="payment"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.payment?.message}>
              <RadioGroup
                {...register("payment")}
                onChange={field.onChange}
              >
                <FormControlLabel value={Payment.ONLINE} control={<Radio />} label={String(t(messages.online))} />
                <FormControlLabel value={Payment.PERSONAL_DELIVERY} control={<Radio />}
                                  label={String(t(messages.personalDelivery))}
                />
                <FormControlLabel value={Payment.TRANSACTION} control={<Radio />}
                                  label={String(t(messages.transaction))} />
              </RadioGroup>
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
          type="submit"
          className={styles.checkoutButton}
          //disabled={stepper === 1}
        >
          {String(t(messages.checkout))}
        </button>
      </form>
    </div>
  );
};

export default Delivery;
