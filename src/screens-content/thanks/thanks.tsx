import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Container from '@mui/material/Container'
import thanks from '../../assets/thanks.png'
import styles from './thanks.module.scss'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useTranslation } from 'react-i18next'
import { messages } from '../../messages/messages'

enum StateEnum {
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
}

const Thank = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()

  const [status, setStatus] = useState<StateEnum>()

  // TODO: implement cancel flow
  // const stripeStatusCanceled = router.query?.canceled as string;

  const content = useMemo(
    () => ({
      title:
        status === StateEnum.SUCCESS
          ? messages.thanksTitle
          : messages.thanksTitleError,
      subtitle:
        status === StateEnum.SUCCESS
          ? messages.thanksSubtitle
          : messages.thanksSubtitleError,
      subtitleContact:
        status === StateEnum.SUCCESS
          ? messages.thanksSubtitleContact
          : messages.thanksSubtitleContactError,
      subtitleThx: messages.thanksSubtitleThx,
      link: messages.thanksLink,
    }),
    [status]
  )

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
      setStatus(StateEnum.SUCCESS)
    } else if ((router.query?.canceled as string) === 'true') {
      setStatus(StateEnum.CANCELED)
    } else {
      setStatus(undefined)
    }
  }, [router.query])

  return (
    <Container>
      {status && (
        <div className={styles.container}>
          <h1>{String(t(content.title))}</h1>
          <p className={styles.text}>{String(t(content.subtitle))}</p>
          <p className={styles.text}>{String(t(content.subtitleContact))}</p>
          <p className={styles.text}>{String(t(content.subtitleThx))}</p>
          <p onClick={redirect} className={styles.link}>
            {String(t(content.link))}
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
      )}
    </Container>
  )
}

export default Thank
