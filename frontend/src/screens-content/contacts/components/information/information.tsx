import { Container, Link } from "@mui/material";
import styles from "../../contacts.module.scss"
import { useTranslation } from "react-i18next";
import * as PagesUrls from "../../../../constants/pages/urls";
import { messages } from "messages/messages";

const Information = (): JSX.Element => {
  const {t} = useTranslation();
  // TODO: replace facebook, instagram, tiktok links
  // TODO: translate Kontakt -> after merge of Social sites
  return (
    <Container>
      <div>
        <div className={styles.infoTitleContainer}>
          <h1 className={styles.infoTitle}>Kontakt</h1>
          <p className={styles.infoComment}>{t(messages.contactInfoComment)}
          </p>
        </div>
        <InfoRow title={t(messages.deliveryPoint)} values={["Progrup s.r.o.","Zvonárenská 2886/30 A","052 01 Spišská Nová Ves"]}></InfoRow>
        <InfoRow title={t(messages.billingInfo)} values={["Hashlab s.r.o.","52575420","Obchodný register Mestského súdu Košice","oddiel: Sro, vložka č. 46939/V"]}></InfoRow>
      </div>
      
      <h2 className={styles.infoSocialTitle}>{t(messages.socialSite)}</h2>
      <Link href={PagesUrls.NONE} rel="noreferrer" target="_blank" className={styles.infoSocialLink}>Facebook</Link>
      <Link href={PagesUrls.NONE} rel="noreferrer" target="_blank" className={styles.infoSocialLink}>Instagram</Link>
      <Link href={PagesUrls.NONE} rel="noreferrer" target="_blank" className={styles.infoSocialLink}>Tiktok</Link>
    </Container>
  );
};

type InfoRowType = {
  title: string;
  values: string[];
}

const InfoRow = ({title, values}: InfoRowType): JSX.Element => {
  return (
    <div className={styles.infoRow}>
      <p className={styles.infoValueTitle}>{title}</p>
      {values.map(value => <p className={styles.infoValue}>{value}</p>)}
    </div>
  );
};



export default Information;