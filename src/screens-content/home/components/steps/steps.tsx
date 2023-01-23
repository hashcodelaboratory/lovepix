import styles from "../../home.module.scss";
import { useTranslation } from "next-i18next";
import { STEPS, STEPS_GRID_STYLE } from "../../utils/steps";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Steps = () => {
  const { t } = useTranslation();

  const columns = STEPS.map(({ icon, title }) => (
    <Grid item key={uuidv4()} className={styles.horizontalItem}>
      {icon}
      <div className={styles.itemTitle}>{String(t(title))}</div>
    </Grid>
  ));

  return (
    <Grid
      container
      className={styles.horizontalContainer}
      spacing={2}
      sx={STEPS_GRID_STYLE}
    >
      {columns}
    </Grid>
  );
};

export default Steps;
