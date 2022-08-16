import styles from "../home.module.scss";
import {MATERIALS} from "../utils/materials";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {Grid} from "@mui/material";

const Materials = () => {

    const { t } = useTranslation();

    const columns = MATERIALS.map(({ img, title, text}) =>
        <Grid key={title}>
            <Image className={styles.itemImage} src={img} width={300} height={250} />
            <div className={styles.materialsTitle}>{String(t(title))}</div>
            <div className={styles.materialsText}>{String(t(text))}</div>
        </Grid>
    );

    return(
        <Grid container className={styles.horizontalContainer}>{columns}</Grid>
    )
}

export default Materials;