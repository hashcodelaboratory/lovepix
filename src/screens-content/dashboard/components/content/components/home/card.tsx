import styles from '../../../../dashboard.module.scss'
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../../messages/messages";

const Card = () => {

    const { t } = useTranslation();

    return(
        <div className={styles.cardContainer}>
            <div className={styles.cardIconContainer}></div>
            <div className={styles.cardHeader}>
                <p className={styles.cardHeaderTitle}>{String(t(messages.orders))}</p>
                <p className={styles.cardHeaderNumber}>258</p>
                <hr className={styles.cardDivider}></hr>
                <p className={styles.cardFooterTitle}><b style={{ color: 'rgb(76, 175, 80)' }}>+ 55 %</b> than last week</p>
            </div>
        </div>
    )
}

export default Card