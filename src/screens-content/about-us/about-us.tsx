import { Container } from "@mui/material";
import styles from "./about-us.module.scss";
import { useTranslation } from "next-i18next";
import { messages } from "../../messages/messages";

const CustomAboutUs = () => {
  const { t } = useTranslation();

  return (
    <Container className={styles.container}>
      <div>
        <p>{String(t(messages.aboutUsFrom))}</p>
        <p>{String(t(messages.aboutUsThanks))}</p>
        <p>{String(t(messages.aboutUsWant))}</p>
        <p>{String(t(messages.aboutUsHelp))}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.miniTitle}>
          {String(t(messages.aboutUsPriorities))}
        </p>
        <h1 className={styles.title}>{String(t(messages.aboutUsProud))}</h1>
      </div>
    </Container>
  );
};

export default CustomAboutUs;
