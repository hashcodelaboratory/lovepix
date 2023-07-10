import lovepixIcon from "../../../../assets/logo_gray.svg";
import facebookIcon from "../../../../assets/facebook.svg";
import twitterIcon from "../../../../assets/twitter.svg";
import instagramIcon from "../../../../assets/instagram.svg";
import styles from "../../footer.module.scss";
import { Container, Link } from "@mui/material";
import Image from "next/image";
import { ImageLayout } from "../../../home/enums/enums";
import { useTranslation } from "react-i18next";
import { messages } from "../../../../messages/messages";
import * as PagesUrls from "../../../../constants/pages/urls"

const FooterIcons = (): JSX.Element => {
  const { t } = useTranslation();
  // external href in <Link> does not work without 2 leading slashes or 'https://' 
  return (
    <Container>
      <hr />
      <div className={styles.footerIconsRow}>
        <Image
          src={lovepixIcon}
          layout={ImageLayout.FIXED}
          width={22}
          height={22}
          alt=""
        />
        <p className={styles.footerIconsText}><b>{t(messages.partners)}:</b></p>
        <Link className={styles.footerIconsText} href="https://www.mojkalendar.sk" target="_blank" rel="noreferrer">mojkalendar.sk</Link>
        <Link className={styles.footerIconsText} href="https://www.odfotma.sk" target="_blank" rel="noreferrer">odfotma.sk</Link>
        <Link className={styles.footerIconsText} href="https://www.hashlab.com" target="_blank" rel="noreferrer">hashlab.com</Link>
      </div>
      <hr />
      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottomContainerRow}>
          <div className={styles.footerBottomIcon}>
            <Image
              src={facebookIcon}
              layout={ImageLayout.FIXED}
              width={22}
              height={22}
              alt=""
            />
          </div>
          <div className={styles.footerBottomIcon}>
            <Image
              src={instagramIcon}
              layout={ImageLayout.FIXED}
              width={22}
              height={22}
              alt=""
            />
          </div>
          <div className={styles.footerBottomIcon}>
            <Image
              src={twitterIcon}
              layout={ImageLayout.FIXED}
              width={22}
              height={22}
              className={styles.footerBottomIcon}
              alt=""
            />
          </div>
        </div>
        <div className={styles.footerBottomContainerRow}>
          <p className={styles.footerBottomContainerRowText} style={{ marginRight: 36 }}>
            {t(messages.copyright)}
          </p>
          <Link className={styles.footerBottomContainerRowTextLink} href={PagesUrls.CONDITIONS} target="_blank">
            {t(messages.conditions)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link className={styles.footerBottomContainerRowTextLink} href={PagesUrls.PRIVACY_POLICY} target="_blank">
            {t(messages.privacy)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link className={styles.footerBottomContainerRowTextLink} href={PagesUrls.COOKIES} target="_blank">
            {t(messages.cookies)}
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default FooterIcons;