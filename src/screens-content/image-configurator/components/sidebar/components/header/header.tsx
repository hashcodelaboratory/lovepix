import styles from '../../../../image-configurator-layout.module.scss'

type Props = {
  icon: JSX.Element
  title: string
}

const Header = ({ icon, title }: Props) => {
  return (
    <div className={styles.header}>
      {icon}
      <h3 className={styles.headerTitle}>{title}</h3>
    </div>
  )
}

export default Header
