import { Container, Link } from "@mui/material";
import styles from "../../contacts.module.scss"
import { useTranslation } from "react-i18next";

const Information = (): JSX.Element => {
  // TODO: replace facebook, instagram, tiktok links
  // TODO: add translation
  return (
    <Container>
      <div>
        <div className={styles.infoTitleContainer}>
          <h1 className={styles.infoTitle}>Kontakt</h1>
          <p className={styles.infoComment}>Potrebujete poradiť? Nenašli ste čo ste hľadali? 
            Potrebujete vyrobiť niečo na mieru? Radi vám s tým 
            - pomôžeme. Ozvite sa nám!
          </p>
        </div>
        <InfoRow title="Odberné miesto" values={["Progrup s.r.o.","Zvonárenská 2886/30 A","052 01 Spišská Nová Ves"]}></InfoRow>
        <InfoRow title="Fakturačné údaje" values={["Hashlab s.r.o.","52575420","Obchodný register Mestského súdu Košice","oddiel: Sro, vložka č. 46939/V"]}></InfoRow>
      </div>
      
      <h2 className={styles.infoSocialTitle}>Sociálne siete</h2>
      <Link href="#" rel="noreferrer" target="_blank" className={styles.infoSocialLink}>Facebook</Link>
      <Link href="#" rel="noreferrer" target="_blank" className={styles.infoSocialLink}>Instagram</Link>
      <Link href="#" rel="noreferrer" target="_blank" className={styles.infoSocialLink}>Tiktok</Link>
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