import styles from "../../../shopping-cart.module.scss";
import {useContext, useState} from "react";
import AppContext from "../../../../../app-context/app-context";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";
import {FormControl, Link, Select, SelectChangeEvent, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const Delivery = () => {
    const { state: { image: { size } }, stateAction: { setStepper } } = useContext(AppContext);

    const { t } = useTranslation();

    const [delivery, setDelivery] = useState<string>('');
    const [payment, setPayment] = useState<string>('');

    const handleChangeDelivery = (event: SelectChangeEvent) => {
        setDelivery(event.target.value);
    };

    const handleChangePayment = (event: SelectChangeEvent) => {
        setPayment(event.target.value);
    };

    const confirm = () => {
        setStepper(1);
    }

    return (
        <div className={styles.deliveryContainer}>
            <h2>{String(t(messages.summary))}</h2>
            <hr/>
            <div className={styles.totalContainer}>
                <p>{size} {String(t(messages.items))}</p>
                <p>€ 17.99</p>
            </div>
            <p className={styles.summarySectionTitle}>{String(t(messages.delivery))}</p>
            <FormControl variant="filled" sx={{ width: 300 }}>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={delivery}
                    onChange={handleChangeDelivery}
                >
                    <MenuItem value={10}>{String(t(messages.courier))}</MenuItem>
                    <MenuItem value={20}>{String(t(messages.personalCollect))}</MenuItem>
                    <MenuItem value={30}>{String(t(messages.pickup))}</MenuItem>
                </Select>
            </FormControl>
            <p className={styles.summarySectionTitle}>{String(t(messages.code))}</p>
            <TextField className={styles.codeField} placeholder="WALLER22" />
            <p className={styles.summarySectionTitle}>{String(t(messages.payment))}</p>
            <FormControl variant="filled" sx={{ width: 300 }}>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={payment}
                    onChange={handleChangePayment}
                >
                    <MenuItem value={40}>{String(t(messages.online))}</MenuItem>
                    <MenuItem value={50}>{String(t(messages.personalDelivery))}</MenuItem>
                </Select>
            </FormControl>
            <div className={styles.totalContainer}>
                <p className={styles.summarySectionTitle}>{String(t(messages.total))}</p>
                <p className={styles.price}>€ 18.99</p>
            </div>
            <p className={styles.text}>{String(t(messages.personalData))}</p>
            <Link className={styles.text} style={{ cursor: "pointer" }}>
                <b>{String(t(messages.privacy))}</b>
            </Link>
            <button disabled={delivery === '' || payment === ''} className={styles.checkoutButton} onClick={confirm}>
                {String(t(messages.checkout))}
            </button>
        </div>
    )
}

export default Delivery