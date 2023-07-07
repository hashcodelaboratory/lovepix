import { CSSProperties } from 'react'
import styles from '../../../../../../../image-configurator-layout.module.scss'

type Props = {
  x: string
  // y: number
  onClick?: () => void
  selected?: boolean
  style?: CSSProperties
}

const TabPanelBox = ({ x, onClick, selected, style = {} }: Props) => {
  return (
    <div
      className={styles.tabPanelBox}
      style={{
        borderColor: selected ? '#f1f1f1' : '#e0e0e0',
        boxShadow: selected ? '4px 3px 8px #1976d2' : 'none',
        ...style,
      }}
      onClick={onClick}
    >
      <p style={{ fontSize: 12, color: 'gray' }}>{x} cm</p>
    </div>
  )
}

export default TabPanelBox
