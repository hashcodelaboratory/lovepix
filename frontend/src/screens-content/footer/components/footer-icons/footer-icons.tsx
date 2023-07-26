import lovepixIcon from '../../../../assets/logo_gray.svg'
import facebookIcon from '../../../../assets/facebook.svg'
import tiktokIcon from '../../../../assets/tiktok.svg'
import instagramIcon from '../../../../assets/instagram.svg'
import styles from '../../footer.module.scss'
import { Container, Link } from '@mui/material'
import Image from 'next/image'
import { ImageLayout } from '../../../home/enums/enums'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../../../../localization/localization-key'
import {
  FACEBOOK,
  INSTAGRAM,
  Pages,
  TIKTOK,
} from '../../../../constants/pages/urls'
import useLoggedUser from 'common/api/use-logged-user'
import { useRouter } from 'next/router'
import { logIn, logOut } from 'auth'
import { settings } from 'navigation'
import { DASHBOARD } from 'constants/settings/titles'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

const FooterIcons = (): JSX.Element => {
  const { t } = useTranslation()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
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

  const userSettings = settings.filter((item) => item.title !== DASHBOARD)
  const menuOptions = user?.isAdmin ? settings : userSettings

  // TODO: add change tiktok link
  return (
    <Container>
      <div>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={!!user ? user.displayName || '' : undefined}
              src='/static/images/avatar/2.jpg'
            />
          </IconButton>
        </Tooltip>

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
      </div>
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
          <b>{t(localizationKey.partners)}:</b>
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
      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottomContainerRow}>
          <div className={styles.footerBottomIcon}>
            <Link href={FACEBOOK} rel='noreferrer' target='_blank'>
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
            <Link href={INSTAGRAM} rel='noreferrer' target='_blank'>
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
            <Link href={TIKTOK} rel='noreferrer' target='_blank'>
              <Image
                src={tiktokIcon}
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
            {t(localizationKey.copyright)}
          </p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={Pages.CONDITIONS}
            target='_blank'
          >
            {t(localizationKey.conditions)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={Pages.PRIVACY_POLICY}
            target='_blank'
          >
            {t(localizationKey.privacyPolicy)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={Pages.COOKIES}
            target='_blank'
          >
            {t(localizationKey.cookies)}
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default FooterIcons
