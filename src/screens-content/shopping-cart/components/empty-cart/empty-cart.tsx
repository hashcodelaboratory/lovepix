import { ShoppingCart } from '@mui/icons-material'
import styles from '../../shopping-cart.module.scss'
import { Button, Container } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../messages/messages'
import { useRouter } from 'next/router'

const EmptyCart = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const redirect = () => {
    router.push('/')
  }

  return (
    <Container>
      <div className={styles.emptyCartContainer}>
        <ShoppingCart className={styles.icon} />
        <p className={styles.title}>{String(t(messages.emptyCart))}</p>
        <Button onClick={redirect}>{String(t(messages.backToShop))}</Button>
      </div>
    </Container>
  )
}

export default EmptyCart
