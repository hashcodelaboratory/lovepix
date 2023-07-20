import {Container, Link} from "@mui/material";
import styles from "../../contacts.module.scss"
import {useTranslation} from "react-i18next";
import * as PagesUrls from "../../../../constants/pages/urls";
import {messages} from "messages/messages";
import {HASHLAB_ADDRESS, PROGRUP_ADDRESS} from "./constants";
import {InfoRow} from "./info-row";

const Information = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <div>
        <div className={styles.infoTitleContainer}>
          <h1 className={styles.infoTitle}>{t(messages.contact)}</h1>
          <p className={styles.infoComment}>{t(messages.contactInfoComment)}
          </p>
        </div>
        <InfoRow
          title={t(messages.deliveryPoint)}
          values={PROGRUP_ADDRESS}
        />
        <InfoRow
          title={t(messages.billingInfo)}
          values={HASHLAB_ADDRESS}
        />
      </div>

      <h2 className={styles.infoSocialTitle}>{t(messages.socialSite)}</h2>
      <Link
        href={PagesUrls.FACEBOOK}
        rel="noreferrer"
        target="_blank"
        className={styles.infoSocialLink}
      >
        Facebook
      </Link>
      <Link
        href={PagesUrls.INSTAGRAM}
        rel="noreferrer"
        target="_blank"
        className={styles.infoSocialLink}
      >
        Instagram
      </Link>
      <Link
        href={PagesUrls.TIKTOK}
        rel="noreferrer"
        target="_blank"
        className={styles.infoSocialLink}
      >
        Tiktok
      </Link>
    </Container>
  );
};

export default Information;