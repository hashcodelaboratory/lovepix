import styles from "../../home.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS, STEPS_GRID_STYLE} from "../../utils/steps";
import {Grid} from "@mui/material";

const Steps = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(({icon, title}) =>
        <Grid item key={title} className={styles.horizontalItem}>
            {icon}
            <div className={styles.itemTitle}>{String(t(title))}</div>
        </Grid>
    )

    return(
        <Grid container className={styles.horizontalContainer} spacing={2} sx={STEPS_GRID_STYLE}>
            {columns}
        </Grid>
    )
}

export default Steps;