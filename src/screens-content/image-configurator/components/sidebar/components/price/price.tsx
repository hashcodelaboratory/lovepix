import styles from '../../../../image-configurator-layout.module.scss';

const Price = () => {
  return(
      <div className={styles.containerPadding}>
        <div className={styles.price}>
          <h3><b>Cena</b></h3>
          <p className={styles.priceNoTax}>20 € bez DPH</p>
          <h3><b>22 € </b></h3>
        </div>
        <hr />
      </div>
  )
}

export default Price