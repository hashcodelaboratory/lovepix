import styles from "../main.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS} from "../utils/steps";

const StepsPart = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(step =>
        <div key={step.img} className={styles.step}>
            <img className={styles.stepImage} src={step.img} alt={step.title} />
            <div>{String(t(step.title))}</div>
        </div>
    )

    return(
        <div className={styles.stepsContainer}>
            {columns}
        </div>
    )
}

export default StepsPart;