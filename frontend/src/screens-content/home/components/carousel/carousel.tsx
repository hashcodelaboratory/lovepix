import styles from "../../home.module.scss";
import Container from "@mui/material/Container";
import {useTranslation} from "next-i18next";
import {localizationKey} from "../../../../localization/localization-key";
import useNavigation from "../../../../navigation/use-navigation";

export enum CarouselTestIds {
  navigateToConfiguratorButtonTestId = 'navigate_to_configurator_button_test_id'
}

const Carousel = (): JSX.Element => {
  const {t} = useTranslation();
  const {navigateToConfigurator} = useNavigation();
  const {printPhoto, uploadPhotoSubcontent, uploadPhoto} = localizationKey;

  return (
    <div className={styles.carousel}>
      <Container className={styles.carouselContainer}>
        <h1 className={styles.carouselTitle}>{String(t(printPhoto))}</h1>
        <p className={styles.carouselSubTitle}>
          {String(t(uploadPhotoSubcontent))}
        </p>
        <button data-testid={CarouselTestIds.navigateToConfiguratorButtonTestId} className={styles.carouselButton}
                onClick={navigateToConfigurator}>{String(t(uploadPhoto))}</button>
      </Container>
    </div>
  )
}

export default Carousel;