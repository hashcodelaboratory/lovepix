import styles from "../home.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS} from "../utils/steps";
import Image from "next/image";
import {Grid} from "@mui/material";

const Steps = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(({img, title}) =>
        <Grid key={img} className={styles.horizontalItem}>
            <Image className={styles.itemImage} src={img} alt={title} width={200} height={100} />
            <div className={styles.itemTitle}>{String(t(title))}</div>
        </Grid>
    )

    return(
        <Grid container className={styles.horizontalContainer}>
            {columns}
        </Grid>
    )
}

export default Steps;