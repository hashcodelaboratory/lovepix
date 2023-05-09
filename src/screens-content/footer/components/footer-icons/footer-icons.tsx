import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "../../footer.module.scss";

const FooterIcons = (): JSX.Element => {
  return (
    <>
      <div className={styles.footerIconsRow}>
        <FacebookIcon className={styles.footerIcon} sx={{ color: "#3B579D" }} />
        <InstagramIcon className={styles.footerIcon} sx={{ color: "#22578A" }} />
        <YouTubeIcon className={styles.footerIcon} sx={{ color: "#C31B18" }} />
        <TwitterIcon className={styles.footerIcon} sx={{ color: "#46AAE4" }} />
      </div>
      <div className={styles.footerContainer}>
        <p className={styles.footerContainerTitle}>Copyright 2023 WESTech, spol. s r.o., Stará Vajnorská 17,
          Bratislava</p>
        <p className={styles.footerContainerTitle}>Všetky práva vyhradené.</p>
        <p className={styles.footerContainerText}>Technické riešenie © 2023 Hashlab s.r.o.</p>
      </div>
    </>
  );
};

export default FooterIcons;