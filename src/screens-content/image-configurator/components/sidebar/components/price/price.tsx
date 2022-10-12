import styles from '../../../../image-configurator-layout.module.scss';

const Price = () => {
  return(
      <div className={styles.containerPadding}>
        <div className={styles.price}>
          <h3><b>Cena</b></h3> 20 bez DPH <h3><b>22 Eur</b></h3>
        </div>
        <hr />
      </div>
  )
}

export default Price