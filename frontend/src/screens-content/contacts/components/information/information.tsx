import { Container, Link } from "@mui/material";
import styles from "../../contacts.module.scss"
import { useTranslation } from "react-i18next";

const Information = (): JSX.Element => {

  return (
      <Container>
        <InfoRow key="kontakt" title="Kontakt:" values={[[""]]}></InfoRow>
        <InfoRow key="phone" title="Telefónny kontakt:" values={[["+421 947 904 580"]]}></InfoRow>
        <InfoRow key="faktura" title="Fakturačné údaje:" values={[["Hashlab s.r.o","https://finstat.sk/52575420"]]}></InfoRow>
        <InfoRow key="place" title="Odberné miesto:" values={[["Progrup s.r.o"],["Zvonárska 2886/30 A | 052 01 Spišská Nová Ves"]]}></InfoRow>
      </Container>
  );
};

type InfoRowType = {
  title: string;
  values: string[][];
}

const InfoRow = ({title, values}: InfoRowType): JSX.Element => {
  let ret = [];
  for(let i=0;i<values.length;i++){
    if(values[i].length === 1) ret.push(<p key={values[i][0]} className={styles.infoValueText}>{values[i][0]}</p>);
    if(values[i].length === 2) ret.push(<Link key={values[i][0]} className={styles.infoValueLink} href={values[i][1]} target="_blank" rel="noreferrer">{values[i][0]}</Link>);
  }
  return (
    <Container>
    <div className={styles.infoRow}>
      <p className={styles.infoTitle}>{title}</p>
      <div>
        {ret}
      </div>
      
    </div>
    </Container>
  );
};



export default Information;