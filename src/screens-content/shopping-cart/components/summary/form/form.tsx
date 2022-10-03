import {TextField, Box} from "@mui/material";
import styles from "../../../shopping-cart.module.scss";
import {useForm} from "react-hook-form";

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
    const { register, formState: { errors } } = useForm<FormInputs>();

    console.log(errors);

    return(
        <div className={styles.formContainer}>
            <Box
                component="div"
                sx={{
                    '& > :not(style)': { m: 2 },
                }}
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Meno"
                    placeholder="Meno"
                    {...register("firstName")}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Priezvisko"
                    placeholder="Priezvisko"
                    {...register("lastName")}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Nazov spolocnosti"
                    placeholder="Nazov spolocnosti"
                    fullWidth
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Ulica, c. domu"
                    placeholder="Ulica, c. domu"
                    fullWidth
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Mesto"
                    placeholder="Mesto"
                    fullWidth
                />
                <TextField
                    required
                    id="outlined-required"
                    label="PSC"
                    placeholder="PSC"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Telefon"
                    placeholder="Telefon"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="E-mail"
                    placeholder="E-mail"
                    fullWidth
                />
            </Box>
        </div>
    )
}

export default Form