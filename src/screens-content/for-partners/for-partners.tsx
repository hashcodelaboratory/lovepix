import styles from "./for-partners.module.scss";
import Image from "next/image";
import {Container} from "@mui/material";
import {useTranslation} from "next-i18next";
import {messages} from "../../messages/messages";
import {ImageLayout} from "../home/enums/enums";

const CustomForPartners = () => {

    const { t } = useTranslation();

    return(
        <Container className={styles.container}>
            <div className={styles.card}>
                <Image
                    alt="one"
                    src="https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/for-partners-page%2Fban.jpeg?alt=media&token=4fdc2c4d-d6f9-44d1-af17-9f486f02cbf4"
                    width={400}
                    height={500}
                    layout={ImageLayout.FIXED}
                    className={styles.image}
                />
                <p className={styles.title}>{String(t(messages.partnersOneTitle))}</p>
                <p className={styles.text}>{String(t(messages.partnersOneSubtitle))}</p>
                <p className={styles.text}>{String(t(messages.partnersOneDescription))}</p>
            </div>
            <div className={styles.card}>
                <Image
                    alt="two"
                    src="https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/for-partners-page%2Fban2.jpeg?alt=media&token=9f9ceec4-fc3a-4ce6-8dc8-323cff5055b1"
                    width={400}
                    height={500}
                    layout={ImageLayout.FIXED}
                    className={styles.image}
                />
                <p className={styles.title}>{String(t(messages.partnersTwoTitle))}</p>
                <p className={styles.text}>{String(t(messages.partnersTwoSubtitle))}</p>
                <p className={styles.text}>{String(t(messages.partnersTwoDescription))}</p>
            </div>
        </Container>
    )
}

export default CustomForPartners