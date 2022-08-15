import styles from "../home.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS} from "../utils/steps";

const Steps = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(({img, title}) =>
        <div key={img} className={styles.step}>
            <img className={styles.stepImage} src={img} alt={title} />
            <div>{String(t(title))}</div>
        </div>
    )

    return(
        <div className={styles.stepsContainer}>
            {columns}
        </div>
    )
}

export default Steps;