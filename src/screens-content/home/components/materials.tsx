import styles from "../home.module.scss";
import {MATERIALS, MATERIALS_GRID_STYLE} from "../utils/materials";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {Grid} from "@mui/material";
import {ObjectFit} from "../enums/enums";

const Materials = () => {

    const { t } = useTranslation();

    const columns = MATERIALS.map(({ img, title, text}) =>
        <Grid item key={title}>
            <Image alt={title} src={img} width={300} height={250} objectFit={ObjectFit.COVER} />
            <div className={styles.materialsTitle}>{String(t(title))}</div>
            <div className={styles.materialsText}>{String(t(text))}</div>
        </Grid>
    );

    return(
        <Grid container className={styles.horizontalContainer} spacing={4} sx={MATERIALS_GRID_STYLE}>
            {columns}
        </Grid>
    )
}

export default Materials;