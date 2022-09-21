import styles from "../../../shopping-cart.module.scss";
import {useContext, useState} from "react";
import AppContext from "../../../../../app-context/app-context";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../messages/messages";
import Button from "@mui/material/Button";
import {FormControl, Link, Select, SelectChangeEvent, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const Delivery = () => {
    const { state: { image: { size } } } = useContext(AppContext);

    const { t } = useTranslation();

    const [delivery, setDelivery] = useState<string>('');
    const [payment, setPayment] = useState<string>('');

    const handleChangeDelivery = (event: SelectChangeEvent) => {
        setDelivery(event.target.value);
    };

    const handleChangePayment = (event: SelectChangeEvent) => {
        setPayment(event.target.value);
    };

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
                    <MenuItem value={10}>Kuriér na adresu: 5.00 €</MenuItem>
                    <MenuItem value={20}>Osobný odber - Spišská Nová Ves</MenuItem>
                    <MenuItem value={30}>Zásielkovňa: 2.20 €</MenuItem>
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
                    <MenuItem value={40}>Online</MenuItem>
                    <MenuItem value={50}>Pri osobnom odbere</MenuItem>
                </Select>
            </FormControl>
            <Button disabled={delivery === '' || payment === ''} className={styles.checkoutButton}>
                {String(t(messages.checkout))}
            </Button>
            <p className={styles.text}>Vaše osobné údaje budú použité na spracovanie vašej objenávky, zjednodušenie používania tejto webovej stránky a na iné účely opísané v dokumente.</p>
            <Link className={styles.text} style={{ cursor: "pointer" }}><b>Pravidlá ochrany súkromia</b></Link>
        </div>
    )
}

export default Delivery