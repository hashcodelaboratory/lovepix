import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import thanks from '../../assets/thanks.png'
import styles from './thanks.module.scss'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useTranslation } from 'react-i18next'
import { messages } from '../../messages/messages'

const Thank = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()

  // TODO: implement cancel flow
  // const stripeStatusCanceled = router.query?.canceled as string;

  const handleClose = () => {
    router.push({
      pathname: '/',
      query: null,
    })
  }

  const redirect = () => {
    router.push('/')
  }

  useEffect(() => {
    if ((router.query?.success as string) === 'true') {
      // TODO
    }
    if ((router.query?.canceled as string) === 'true') {
      // TODO
    }
  }, [router.query])

  return (
    <Container>
      <div className={styles.container}>
        <h1>{String(t(messages.thanksTitle))}</h1>
        <p className={styles.text}>{String(t(messages.thanksSubtitle))}</p>
        <p className={styles.text}>
          {String(t(messages.thanksSubtitleContact))}
        </p>
        <p className={styles.text}>{String(t(messages.thanksSubtitleThx))}</p>
        <p onClick={redirect} className={styles.link}>
          {String(t(messages.thanksLink))}
          <ArrowRightAltIcon />
        </p>
        <Image
          src={thanks}
          alt='user-image'
          layout='intrinsic'
          width={400}
          height={240}
        />
      </div>
    </Container>
  )
}

export default Thank
