import {TextField, Box} from "@mui/material";
import styles from "../../../../shopping-cart.module.scss";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {useContext} from "react";
import AppContext from "../../../../../../app-context/app-context";
import {messages} from "../../../../../../messages/messages";
import {useTranslation} from "next-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import {FORM_SCHEMA} from "./utils/schema";
import {useUpdateOrder} from "../../../../../home/api/order/useUpdateOrder";
import { FormInputs } from "./utils/types";
import {useSession} from "../../../../../../../utils/sessionStorage/useSessionStorage";
import {INITIAL_IMAGE} from "../../../../../../app-context/consts";
import {useQueryClient} from "react-query";
import {ORDER_KEY} from "../../../../../home/api/order/utils/keys";

const Form = (): JSX.Element => {
    const queryClient = useQueryClient();
    const { state: { form }, stateAction: { setStepper, setImage, setForm, setSummary } } = useContext(AppContext);
    const { mutate: updateOrder } = useUpdateOrder({
        onSuccess: () => {
            reset();
            setImage(INITIAL_IMAGE);
            setForm(undefined);
            setSummary(undefined);
            setStepper(2);
            clearOrderID();
            queryClient.invalidateQueries(ORDER_KEY);
        }
    });

    const { t } = useTranslation();

    const { clearOrderID } = useSession();

    const { register, formState: { errors }, handleSubmit, control, reset } = useForm<FormInputs>({
        resolver: yupResolver(FORM_SCHEMA),
        defaultValues: { ...form }
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        updateOrder({ form: data, date: Date.now() });
    }

    return(
        <div className={styles.formContainer}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller name="firstName" control={control}
                    render={({ field }) =>
                        <TextField
                            label={String(t(messages.name))}
                            placeholder={String(t(messages.name))}
                            {...field}
                            {...register("firstName", { required: true })}
                            error={!!errors.firstName?.message}
                            helperText={String(t(errors.firstName?.message ?? ""))}
                        />
                    }
                />
                <Controller name="lastName" control={control}
                    render={({ field }) =>
                        <TextField
                            label={String(t(messages.surname))}
                            placeholder={String(t(messages.surname))}
                            {...field}
                            {...register("lastName", { required: true })}
                            error={!!errors.lastName?.message}
                            helperText={String(t(errors.lastName?.message ?? ""))}
                        />
                    }
                />
                <Controller name="company" control={control}
                    render={({field}) =>
                        <TextField
                            label={String(t(messages.company))}
                            placeholder={String(t(messages.company))}
                            fullWidth
                            {...field}
                            {...register("company")}
                        />
                    }
                />
                <Controller name="address" control={control}
                    render={({field}) =>
                        <TextField
                            label={String(t(messages.address))}
                            placeholder={String(t(messages.address))}
                            fullWidth
                            {...field}
                            {...register("address", { required: true })}
                            error={!!errors.address?.message}
                            helperText={String(t(errors.address?.message ?? ""))}
                        />
                    }
                />
                <Controller name="city" control={control}
                    render={({field}) =>
                        <TextField
                            label={String(t(messages.city))}
                            placeholder={String(t(messages.city))}
                            fullWidth
                            {...field}
                            {...register("city", { required: true })}
                            error={!!errors.city?.message}
                            helperText={String(t(errors.city?.message ?? ""))}
                        />
                    }
                />
                <Controller name="postalCode" control={control}
                    render={({field}) =>
                        <TextField
                            label={String(t(messages.postalCode))}
                            placeholder={String(t(messages.postalCode))}
                            {...field}
                            {...register("postalCode", { required: true })}
                            error={!!errors.postalCode?.message}
                            helperText={String(t(errors.postalCode?.message ?? ""))}
                        />
                    }
                />
                <Controller name="phone" control={control}
                    render={({field}) =>
                        <TextField
                            label={String(t(messages.phone))}
                            placeholder={String(t(messages.phone))}
                            {...field}
                            {...register("phone", { required: true })}
                            error={!!errors.phone?.message}
                            helperText={String(t(errors.phone?.message ?? ""))}
                        />
                    }
                />
                <Controller name="email" control={control}
                    render={({field}) =>
                        <TextField
                            label={String(t(messages.email))}
                            placeholder={String(t(messages.email))}
                            fullWidth
                            {...field}
                            {...register("email", { required: true })}
                            error={!!errors.email?.message}
                            helperText={errors.email?.message}
                        />
                    }
                />
                <button type="submit" className={styles.orderButton}>{String(t(messages.order))}</button>
            </Box>
        </div>
    )
}

export default Form