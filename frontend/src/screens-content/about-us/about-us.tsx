import { Container } from "@mui/material";
import styles from "./about-us.module.scss";
import { useTranslation } from "next-i18next";
import { localizationKey } from "../../localization/localization-key";

const CustomAboutUs = () => {
  const { t } = useTranslation();

  return (
    <Container className={styles.container}>
      <div>
        <p>{String(t(localizationKey.aboutUsFrom))}</p>
        <p>{String(t(localizationKey.aboutUsThanks))}</p>
        <p>{String(t(localizationKey.aboutUsWant))}</p>
        <p>{String(t(localizationKey.aboutUsHelp))}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.miniTitle}>
          {String(t(localizationKey.aboutUsPriorities))}
        </p>
        <h1 className={styles.title}>{String(t(localizationKey.aboutUsProud))}</h1>
      </div>
    </Container>
  );
};

export default CustomAboutUs;
