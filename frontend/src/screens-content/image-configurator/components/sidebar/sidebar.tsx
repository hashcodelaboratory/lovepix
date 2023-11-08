import styles from '../../image-configurator-layout.module.scss'
import Preview from './components/preview/preview'
import Dimension from './components/dimension/dimension'
import Material from './components/material/material'
import Price from './components/price/price'
import Button from './components/button/button'
import { Configuration } from '../../../../common/types/configuration'
import { useMaterials } from '../../../../common/api/use-materials'

type SidebarProps = {
  configuration: Configuration
}

const Sidebar = ({ configuration }: SidebarProps) => {
  const { data: materials } = useMaterials()

  return (
    <div className={styles.sidebar}>
      <Preview configuration={configuration} />
      <Dimension configuration={configuration} />
      <Material configuration={configuration} materials={materials ?? []} />
      <Price configuration={configuration} />
      <Button configuration={configuration} materials={materials ?? []} />
    </div>
  )
}

export default Sidebar
