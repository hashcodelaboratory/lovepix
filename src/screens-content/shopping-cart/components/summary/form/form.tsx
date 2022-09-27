import {TextField, Box} from "@mui/material";
import styles from "../../../shopping-cart.module.scss";

const Form = (): JSX.Element => {

    return(
        <div className={styles.formContainer}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2 },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Meno"
                    placeholder="Meno"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Priezvisko"
                    placeholder="Priezvisko"
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