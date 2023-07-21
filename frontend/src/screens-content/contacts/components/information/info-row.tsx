import styles from "../../contacts.module.scss";
import {v4 as uuidv4} from "uuid";

type InfoRowProps = {
  title: string;
  values: string[];
}

export const InfoRow = ({title, values}: InfoRowProps) => (
  <div className={styles.infoRow}>
    <h2 className={styles.infoValueTitle}>{title}</h2>
    {values.map(value => <p className={styles.infoValue} key={uuidv4()}>{value}</p>)}
  </div>
);