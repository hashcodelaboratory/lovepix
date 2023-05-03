import styles from "../../home.module.scss";
import Container from "@mui/material/Container";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../messages/messages";

const Carousel = (): JSX.Element => {
  const { t } = useTranslation();
  const { printPhoto, uploadPhotoSubcontent, uploadPhoto } = messages;

  return (
    <div className={styles.carousel}>
      <Container className={styles.carouselContainer}>
        <h1 className={styles.carouselTitle}>{String(t(printPhoto))}</h1>
        <p className={styles.carouselSubTitle}>
          {String(t(uploadPhotoSubcontent))}
        </p>
        <button className={styles.carouselButton}>{String(t(uploadPhoto))}</button>
      </Container>
    </div>
  )
}

export default Carousel;