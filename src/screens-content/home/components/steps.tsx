import styles from "../home.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS, STEPS_GRID_STYLE} from "../utils/steps";
import Image from "next/image";
import {Grid} from "@mui/material";
import {ImageLayout, ObjectFit} from "../enums/enums";

const Steps = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(({img, title}) =>
        <Grid item key={img} className={styles.horizontalItem}>
            <Image src={img} alt={title} width={200} height={60}
                 layout={ImageLayout.FIXED}
                 objectFit={ObjectFit.CONTAIN}
            />
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