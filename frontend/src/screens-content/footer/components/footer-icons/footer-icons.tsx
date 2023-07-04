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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
        />
        <p className={styles.footerIconsText}><b>{t(messages.partners)}:</b></p>
        <p className={styles.footerIconsText}>mojkalendar.sk</p>
        <p className={styles.footerIconsText}>hobbyfotograf.sk</p>
        <p className={styles.footerIconsText}>hashlab.sk</p>
      </div>
      <hr />
      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottomContainerRow}>
          <p className={styles.footerBottomContainerRowText}>{t(messages.changeLanguage)}</p>
          <KeyboardArrowDownIcon sx={{ color: "gray", mr: 3 }} />
          <div className={styles.footerBottomIcon}>
            <Image
              src={facebookIcon}
              layout={ImageLayout.FIXED}
              width={22}
              height={22}

            />
          </div>
          <div className={styles.footerBottomIcon}>
            <Image
              src={instagramIcon}
              layout={ImageLayout.FIXED}
              width={22}
              height={22}
            />
          </div>
          <div className={styles.footerBottomIcon}>
            <Image
              src={twitterIcon}
              layout={ImageLayout.FIXED}
              width={22}
              height={22}
              className={styles.footerBottomIcon}
            />
          </div>
        </div>
        <div className={styles.footerBottomContainerRow}>
          <p className={styles.footerBottomContainerRowText} style={{ marginRight: 36 }}>
            Copyright © 2023 Lovepix. Všetky práva vyhradené.
          </p>
          <p className={styles.footerBottomContainerRowTextLink}>
            Všeobecné obchodné podmienky
          </p>
          <p className={styles.footerDivider}>/</p>
          <p className={styles.footerBottomContainerRowTextLink}>
            Zásady ochrany osobných údajov
          </p>
          <p className={styles.footerDivider}>/</p>
          <p className={styles.footerBottomContainerRowTextLink}>
            Cookies
          </p>
        </div>
      </div>
    </Container>
  );
};

export default FooterIcons;