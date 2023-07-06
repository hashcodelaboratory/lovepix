import lovepixIcon from "../../../../assets/logo_gray.svg";
import facebookIcon from "../../../../assets/facebook.svg";
import twitterIcon from "../../../../assets/twitter.svg";
import instagramIcon from "../../../../assets/instagram.svg";
import styles from "../../footer.module.scss";
import { Container } from "@mui/material";
import Image from "next/image";
import { ImageLayout } from "../../../home/enums/enums";
import { useTranslation } from "react-i18next";
import { messages } from "../../../../messages/messages";

const FooterIcons = (): JSX.Element => {
  const { t } = useTranslation();

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
        <a className={styles.footerIconsText} href="//mojkalendar.sk" target="_blank" rel="noreferrer">mojkalendar.sk</a>
        <a className={styles.footerIconsText} href="//odfotma.sk" target="_blank" rel="noreferrer">odfotma.sk</a>
        <a className={styles.footerIconsText} href="//hashlab.com" target="_blank" rel="noreferrer">hashlab.com</a>
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
            Copyright © 2023 Lovepix. Všetky práva vyhradené.
          </p>
          <a className={styles.footerBottomContainerRowTextLink} href="/vseobecne-obchodne-podmienky" target="_blank" rel="noreferrer">
            Všeobecné obchodné podmienky
          </a>
          <p className={styles.footerDivider}>/</p>
          <a className={styles.footerBottomContainerRowTextLink} href="/zasady-ochrany-osobnych-udajov" target="_blank" rel="noreferrer">
            Zásady ochrany osobných údajov
          </a>
          <p className={styles.footerDivider}>/</p>
          <a className={styles.footerBottomContainerRowTextLink} href="/cookies" target="_blank" rel="noreferrer">
            Cookies
          </a>
        </div>
      </div>
    </Container>
  );
};

export default FooterIcons;