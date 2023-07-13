import FooterLinks from "./components/footer-links/footer-links";
import FooterIcons from "./components/footer-icons/footer-icons";
import styles from "./footer.module.scss";
const FooterLayout = (): JSX.Element => {
  return (
    <div className={styles.footerContainer}>
      <FooterLinks />
      <FooterIcons />
    </div>
  )
}

export default FooterLayout;