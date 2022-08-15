import styles from "../home.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS} from "../utils/steps";
import Image from "next/image";

const Steps = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(({img, title}) =>
        <div key={img} className={styles.step}>
            <Image className={styles.stepImage} src={img} alt={title} width={200} height={100} />
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