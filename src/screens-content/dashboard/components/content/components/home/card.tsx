import styles from "../../../../dashboard.module.scss";
import { useTranslation } from "next-i18next";

type CardProps = {
  header: {
    title: string;
    count: string;
    icon: JSX.Element;
  };
  footer: {
    value: string;
    text: string;
  };
};

const Card = ({ header, footer }: CardProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardIconContainer}>{header.icon}</div>
      <div className={styles.cardHeader}>
        <p className={styles.cardHeaderTitle}>{String(t(header.title))}</p>
        <p className={styles.cardHeaderNumber}>{header.count}</p>
        <hr className={styles.cardDivider}></hr>
        <p className={styles.cardFooterTitle}>
          <b className={styles.cardFooterTitleSuccess}>{footer.value} </b>
          {footer.text}
        </p>
      </div>
    </div>
  );
};

export default Card;
