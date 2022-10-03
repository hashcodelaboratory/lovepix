import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";
import {FormControl, Link, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm, Controller, SubmitHandler} from "react-hook-form";

type DeliveryFormInputs = {
    delivery: string;
    payment: string;
};

const Delivery = () => {
    const {
        state: { image: { size } },
        stateAction: { setStepper }
    } = useContext(AppContext);

    const { t } = useTranslation();

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<DeliveryFormInputs>();

    const delivery = watch("delivery");
    const payment = watch("payment");

    console.log(delivery, payment);
    console.log('errors', errors);

    const onSubmit: SubmitHandler<DeliveryFormInputs> = data => {
        console.log('onSubmit', data);
        setStepper(1);
    }

    return (
        <div className={styles.deliveryContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>{String(t(messages.summary))}</h2>
                <hr/>
                <div className={styles.totalContainer}>
                    <p>{size} {String(t(messages.items))}</p>
                    <p>€ 17.99</p>
                </div>
                <p className={styles.summarySectionTitle}>{String(t(messages.delivery))}</p>
                    <Controller
                        name="delivery"
                        control={control}
                        render={({ field }) =>
                            <FormControl fullWidth>
                                <Select
                                    {...field}
                                    {...register("delivery", { required: true })}
                                >
                                    <MenuItem value={"courier"}>{String(t(messages.courier))}</MenuItem>
                                    <MenuItem value={"personalCollect"}>{String(t(messages.personalCollect))}</MenuItem>
                                    <MenuItem value={"pickup"}>{String(t(messages.pickup))}</MenuItem>
                                </Select>
                            </FormControl>
                        }
                    />
                <p className={styles.summarySectionTitle}>{String(t(messages.code))}</p>
                <TextField className={styles.codeField} placeholder="WALLER22" />
                <p className={styles.summarySectionTitle}>{String(t(messages.payment))}</p>
                    <Controller
                        name="payment"
                        control={control}
                        render={({field}) =>
                            <FormControl fullWidth>
                                <Select
                                    {...field}
                                    {...register("payment", {required: true})}
                                >
                                    <MenuItem value={"online"}>{String(t(messages.online))}</MenuItem>
                                    <MenuItem value={"personalDelivery"}>{String(t(messages.personalDelivery))}</MenuItem>
                                </Select>
                            </FormControl>
                        }
                    />
                <div className={styles.totalContainer}>
                    <p className={styles.summarySectionTitle}>{String(t(messages.total))}</p>
                    <p className={styles.price}>€ 18.99</p>
                </div>
                <p className={styles.text}>{String(t(messages.personalData))}</p>
                <Link className={styles.text} style={{ cursor: "pointer" }}>
                    <b>{String(t(messages.privacy))}</b>
                </Link>
                <button
                    type="submit"
                    className={styles.checkoutButton}
                    disabled={!delivery || !payment}
                >
                    {String(t(messages.checkout))}
                </button>
            </form>
        </div>
    )
}

export default Delivery