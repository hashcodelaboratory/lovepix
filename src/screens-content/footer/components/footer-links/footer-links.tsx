import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";

const FooterLinks = (): JSX.Element => {
  return (
    <Container>
      <div className={styles.footerRow}>
        <FooterColumn />
        <FooterColumn />
        <FooterColumn />
        <FooterColumn />
        <FooterColumn />
      </div>
    </Container>
  );
};

const FooterColumn = (): JSX.Element => {
  return (
    <div>
      <h3 className={styles.footerTitle}>Category title</h3>
      <p className={styles.footerText}>Subtitle</p>
      <p className={styles.footerText}>Subtitle</p>
      <p className={styles.footerText}>Subtitle</p>
      <p className={styles.footerText}>Subtitle</p>
      <p className={styles.footerText}>Subtitle</p>
      <p className={styles.footerText}>Subtitle</p>
    </div>
  );
};

export default FooterLinks;