import {TextField, Box} from "@mui/material";
import styles from "../../../shopping-cart.module.scss";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import {messages} from "../../../../../messages/messages";
import {useTranslation} from "next-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const SCHEMA = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
}).required();

type FormInputs = {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
};

const Form = (): JSX.Element => {
    const {
        stateAction: { setStepper }
    } = useContext(AppContext);

    const { t } = useTranslation();

    const { register, formState: { errors }, handleSubmit, control } = useForm<FormInputs>({
        resolver: yupResolver(SCHEMA),
        delayError: 1
    });

    console.log('errors', errors);

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log('onSubmit', data);
        setStepper(2);
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
                            label="Meno"
                            placeholder="Meno"
                            {...field}
                            {...register("firstName", {
                                required: { message: "Name is required field.", value: true }
                            })}
                            error={!!errors.firstName?.message}
                            helperText={errors.firstName?.message}
                        />
                    }
                />
                <Controller name="lastName" control={control}
                    render={({ field }) =>
                        <TextField
                            label="Priezvisko"
                            placeholder="Priezvisko"
                            {...field}
                            {...register("lastName", { required: true })}
                            error={!!errors.lastName?.message}
                            helperText={errors.lastName?.message}
                        />
                    }
                />
                <Controller name="company" control={control}
                    render={({field}) =>
                        <TextField
                            label="Nazov spolocnosti"
                            placeholder="Nazov spolocnosti"
                            fullWidth
                            {...field}
                            {...register("company")}
                        />
                    }
                />
                <Controller name="address" control={control}
                    render={({field}) =>
                        <TextField
                            label="Ulica, c. domu"
                            placeholder="Ulica, c. domu"
                            fullWidth
                            {...field}
                            {...register("address", {required: true})}
                            error={!!errors.address?.message}
                            helperText={errors.address?.message}
                        />
                    }
                />
                <Controller name="city" control={control}
                    render={({field}) =>
                        <TextField
                            label="Mesto"
                            placeholder="Mesto"
                            fullWidth
                            {...field}
                            {...register("city", {required: true})}
                            error={!!errors.city?.message}
                            helperText={errors.city?.message}
                        />
                    }
                />
                <Controller name="city" control={control}
                    render={({field}) =>
                        <TextField
                            label="PSC"
                            placeholder="PSC"
                            {...field}
                            {...register("postalCode", {required: true})}
                            error={!!errors.postalCode?.message}
                            helperText={errors.postalCode?.message}
                        />
                    }
                />
                <Controller name="city" control={control}
                    render={({field}) =>
                        <TextField
                            label="Telefon"
                            placeholder="Telefon"
                            {...field}
                            {...register("phone", {required: true})}
                            error={!!errors.phone?.message}
                            helperText={errors.phone?.message}
                        />
                    }
                />
                <Controller name="city" control={control}
                    render={({field}) =>
                        <TextField
                            label="E-mail"
                            placeholder="E-mail"
                            fullWidth
                            {...field}
                            {...register("email", {required: true})}
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