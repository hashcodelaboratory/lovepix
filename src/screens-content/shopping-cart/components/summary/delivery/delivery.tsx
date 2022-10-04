import styles from "../../../shopping-cart.module.scss";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";
import {FormControl, FormHelperText, Link, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const SCHEMA = yup.object({
    delivery: yup.string().required("Delivery is required field."),
    payment: yup.string().required("Payment is required field."),
}).required();

type SummaryFormInputs = {
    delivery: string;
    payment: string;
};

const Delivery = () => {
    const {
        state: { image: { size } },
        stateAction: { setStepper }
    } = useContext(AppContext);

    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors }, control } = useForm<SummaryFormInputs>({
        resolver: yupResolver(SCHEMA)
    });

    const onSubmit: SubmitHandler<SummaryFormInputs> = (data) => setStepper(1);

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
                            <FormControl fullWidth error={!!errors.delivery?.message}>
                                <Select
                                    {...field}
                                    {...register("delivery", { required: true })}
                                >
                                    <MenuItem value={"courier"}>{String(t(messages.courier))}</MenuItem>
                                    <MenuItem value={"personalCollect"}>{String(t(messages.personalCollect))}</MenuItem>
                                    <MenuItem value={"pickup"}>{String(t(messages.pickup))}</MenuItem>
                                </Select>
                                {errors.delivery?.message && <FormHelperText error>{errors.delivery?.message}</FormHelperText>}
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
                            <FormControl fullWidth error={!!errors.payment?.message}>
                                <Select
                                    {...field}
                                    {...register("payment", { required: true })}
                                >
                                    <MenuItem value={"online"}>{String(t(messages.online))}</MenuItem>
                                    <MenuItem value={"personalDelivery"}>{String(t(messages.personalDelivery))}</MenuItem>
                                </Select>
                                {errors.payment?.message && <FormHelperText error>{errors.payment?.message}</FormHelperText>}
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
                <button type="submit" className={styles.checkoutButton}>{String(t(messages.checkout))}</button>
            </form>
        </div>
    )
}

export default Delivery