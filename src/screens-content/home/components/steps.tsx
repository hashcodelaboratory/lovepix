import styles from "../home.module.scss";
import {useTranslation} from "next-i18next";
import {STEPS} from "../utils/steps";
import Image from "next/image";
import {Grid} from "@mui/material";
import {ImageLayout, ObjectFit} from "../enums/enums";

const Steps = () => {
    const { t } = useTranslation();

    const columns = STEPS.map(({img, title}) =>
        <Grid item key={img} className={styles.horizontalItem}>
            <Image className={styles.itemImage} src={img} alt={title} width={200} height={60}
                 layout={ImageLayout.FIXED}
                 objectFit={ObjectFit.CONTAIN}
            />
            <div className={styles.itemTitle}>{String(t(title))}</div>
        </Grid>
    )

    return(
        <Grid container className={styles.horizontalContainer}
            sx={{ justifyContent: { xs: "center", sm: "space-between", md: "space-between", lg: "space-between", xl: "space-between" } }}
        >
            {columns}
        </Grid>
    )
}

export default Steps;