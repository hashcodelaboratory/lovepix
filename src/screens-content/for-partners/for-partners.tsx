import styles from "./for-partners.module.scss";
import Image from "next/image";
import { Container } from "@mui/material";
import { useTranslation } from "next-i18next";
import { ImageLayout } from "../home/enums/enums";
import { useTranslations } from "../../common/translations/useTranslations";

const CustomForPartners = () => {
  const { i18n } = useTranslation();
  const { data: translations } = useTranslations(i18n.language);

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.card}>
          <Image
            alt='one'
            src='https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/for-partners-page%2Fban.jpeg?alt=media&token=4fdc2c4d-d6f9-44d1-af17-9f486f02cbf4'
            width={400}
            height={500}
            layout={ImageLayout.FIXED}
            className={styles.image}
          />
          <p className={styles.title}>{translations?.partnersOneTitle}</p>
          <p className={styles.text}>{translations?.partnersOneSubtitle}</p>
          <p className={styles.text}>{translations?.partnersOneDescription}</p>
        </div>
        <div className={styles.card}>
          <Image
            alt='two'
            src='https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/for-partners-page%2Fban2.jpeg?alt=media&token=9f9ceec4-fc3a-4ce6-8dc8-323cff5055b1'
            width={400}
            height={500}
            layout={ImageLayout.FIXED}
            className={styles.image}
          />
          <p className={styles.title}>{translations?.partnersTwoTitle}</p>
          <p className={styles.text}>{translations?.partnersTwoSubtitle}</p>
          <p className={styles.text}>{translations?.partnersTwoDescription}</p>
        </div>
      </div>
      <div className={styles.center}>
        <p className={styles.miniTitle}>{translations?.aboutUsPriorities}</p>
        <h1>{translations?.partnersDetails}</h1>
        <p className={styles.text}>{translations?.partnersForm}</p>
      </div>
    </Container>
  );
};

export default CustomForPartners;
