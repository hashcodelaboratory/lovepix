import styles from "../../../../../../home.module.scss";

const PreviewCard = (): JSX.Element => {
  return (
    <div className={styles.previewCard}>
      <div className={styles.previewImage} />
      <div className={styles.previewImageDescription}>
        <p className={styles.previewTitle}>Image name</p>
        <p className={styles.previewPrice}>Cena od 19.99 €</p>
      </div>
    </div>
  );
};

export default PreviewCard;