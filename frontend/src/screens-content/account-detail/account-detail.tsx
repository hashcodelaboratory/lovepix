import useLoggedUser from 'common/api/use-logged-user'
import Image from 'next/image'
import { Container } from '@mui/material'
import classNames from './account-detail.module.scss'

const AccountDetail = () => {
  const { user } = useLoggedUser()

  const styles = {
    image: { borderRadius: 50 },
  }

  return (
    user && (
      <Container className={classNames.container}>
        <div>{user?.displayName}</div>
        <div className={classNames.email}>{user?.email}</div>
        <Image
          src={user?.photoURL || ''}
          alt='user-image'
          layout='fixed'
          style={styles.image}
          width={100}
          height={100}
        />
      </Container>
    )
  )
}

export default AccountDetail
