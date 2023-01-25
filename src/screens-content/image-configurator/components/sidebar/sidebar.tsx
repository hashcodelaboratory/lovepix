import styles from '../../image-configurator-layout.module.scss'
import Preview from './components/preview/preview'
import Dimension from './components/dimension/dimension'
import Material from './components/material/material'
import Price from './components/price/price'
import Button from './components/button/button'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Preview />
      <Dimension />
      <Material />
      <Price />
      <Button />
    </div>
  )
}

export default Sidebar
