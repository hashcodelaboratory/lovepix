import styles from '../../../../image-configurator-layout.module.scss';

const Price = () => {
  return(
      <div className={styles.containerPadding}>
        <div className={styles.price}>
          <b>Cena</b> 20 bez DPH <b>22 Eur</b>
        </div>
        <hr />
      </div>
  )
}

export default Price