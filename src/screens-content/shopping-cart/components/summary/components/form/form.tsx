import { TextField, Box } from "@mui/material";
import styles from "../../../../shopping-cart.module.scss";
import { Controller, FieldErrors, Control } from "react-hook-form";
import { messages } from "../../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import { FormInputs } from "../../../../../../common/types/form";

type FormProps = {
  register: any;
  errors:  FieldErrors<FormInputs>;
  control: Control<FormInputs>;
}

const Form = ({ register, errors, control }: FormProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.formContainer}>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          marginBottom: 5,
        }}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.name))}
              placeholder={String(t(messages.name))}
              {...field}
              {...register("firstName", { required: true })}
              error={!!errors.firstName?.message}
              helperText={String(t(errors.firstName?.message ?? ""))}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.surname))}
              placeholder={String(t(messages.surname))}
              {...field}
              {...register("lastName", { required: true })}
              error={!!errors.lastName?.message}
              helperText={String(t(errors.lastName?.message ?? ""))}
            />
          )}
        />
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.company))}
              placeholder={String(t(messages.company))}
              fullWidth
              {...field}
              {...register("company")}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.address))}
              placeholder={String(t(messages.address))}
              fullWidth
              {...field}
              {...register("address", { required: true })}
              error={!!errors.address?.message}
              helperText={String(t(errors.address?.message ?? ""))}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.city))}
              placeholder={String(t(messages.city))}
              fullWidth
              {...field}
              {...register("city", { required: true })}
              error={!!errors.city?.message}
              helperText={String(t(errors.city?.message ?? ""))}
            />
          )}
        />
        <Controller
          name="postalCode"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.postalCode))}
              placeholder={String(t(messages.postalCode))}
              {...field}
              {...register("postalCode", { required: true })}
              error={!!errors.postalCode?.message}
              helperText={String(t(errors.postalCode?.message ?? ""))}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.phone))}
              placeholder={String(t(messages.phone))}
              {...field}
              {...register("phone", { required: true })}
              error={!!errors.phone?.message}
              helperText={String(t(errors.phone?.message ?? ""))}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label={String(t(messages.email))}
              placeholder={String(t(messages.email))}
              fullWidth
              {...field}
              {...register("email", { required: true })}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />
      </Box>
    </div>
  );
};

export default Form;
