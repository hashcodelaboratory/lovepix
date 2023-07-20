import lovepixIcon from '../../../../assets/logo_gray.svg'
import facebookIcon from '../../../../assets/facebook.svg'
import twitterIcon from '../../../../assets/twitter.svg'
import instagramIcon from '../../../../assets/instagram.svg'
import styles from '../../footer.module.scss'
import { Container, Link } from '@mui/material'
import Image from 'next/image'
import { ImageLayout } from '../../../home/enums/enums'
import { useTranslation } from 'react-i18next'
import { messages } from '../../../../messages/messages'
import * as PagesUrls from '../../../../constants/pages/urls'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import useLoggedUser from 'common/api/use-logged-user'
import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { logIn, logOut } from 'auth'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { settings } from 'navigation'
import { DASHBOARD } from 'constants/settings/titles'

const FooterIcons = (): JSX.Element => {
  const { t } = useTranslation()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const { user } = useLoggedUser()
  const router = useRouter()
  const handleLogout = () => {
    logOut()
    router.push(`/`)
    handleCloseUserMenu()
  }
  // const { user, allowedSettings } = useLoggedUser()

  const userSettings = settings.filter((item) => item.title !== DASHBOARD)
  const menuOptions = user?.isAdmin ? settings : userSettings

  // external href in <Link> does not work without 2 leading slashes or 'https://'
  return (
    <Container>
      <hr />
      <div className={styles.footerIconsRow}>
        <Image
          src={lovepixIcon}
          layout={ImageLayout.FIXED}
          width={22}
          height={22}
          alt=''
        />
        <p className={styles.footerIconsText}>
          <b>{t(messages.partners)}:</b>
        </p>
        <Link
          className={styles.footerIconsText}
          href='https://www.mojkalendar.sk'
          target='_blank'
          rel='noreferrer'
        >
          mojkalendar.sk
        </Link>
        <Link
          className={styles.footerIconsText}
          href='https://www.odfotma.sk'
          target='_blank'
          rel='noreferrer'
        >
          odfotma.sk
        </Link>
        <Link
          className={styles.footerIconsText}
          href='https://www.hashlab.com'
          target='_blank'
          rel='noreferrer'
        >
          hashlab.com
        </Link>
      </div>
      <hr />

      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={!!user ? user.displayName || '' : undefined}
            src='/static/images/avatar/2.jpg'
          />
        </IconButton>
      </Tooltip>
      {/* <p>hello</p> */}
      {/* <p>{adminemails[1]}</p> */}
      {/* <p>{userEmail}</p> */}
      {/* <p>{test}</p> */}

      <Menu
        sx={{ mt: '45px' }}
        id='menu-sidebar-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user ? (
          menuOptions.map((setting) => (
            <MenuItem
              key={setting.title}
              onClick={() => setting.callBack && handleLogout()}
            >
              <Typography textAlign='center'>{setting.title}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={logIn}>
            <Typography textAlign='center'>Login</Typography>
          </MenuItem>
        )}
      </Menu>

      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottomContainerRow}>
          <div className={styles.footerBottomIcon}>
            <Link href={PagesUrls.NONE}>
              <Image
                src={facebookIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                alt=''
              />
            </Link>
          </div>
          <div className={styles.footerBottomIcon}>
            <Link href={PagesUrls.NONE}>
              <Image
                src={instagramIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                alt=''
              />
            </Link>
          </div>
          <div className={styles.footerBottomIcon}>
            <Link href={PagesUrls.NONE}>
              <Image
                src={twitterIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                className={styles.footerBottomIcon}
                alt=''
              />
            </Link>
          </div>
        </div>
        <div className={styles.footerBottomContainerRow}>
          <p
            className={styles.footerBottomContainerRowText}
            style={{ marginRight: 36 }}
          >
            {t(messages.copyright)}
          </p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={PagesUrls.CONDITIONS}
            target='_blank'
          >
            {t(messages.conditions)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={PagesUrls.PRIVACY_POLICY}
            target='_blank'
          >
            {t(messages.privacy)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={PagesUrls.COOKIES}
            target='_blank'
          >
            {t(messages.cookies)}
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default FooterIcons
