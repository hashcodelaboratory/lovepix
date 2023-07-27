import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { logIn, logOut } from 'auth'
import useLoggedUser from 'common/api/use-logged-user'
import { DASHBOARD } from 'constants/settings/titles'
import { settings } from 'navigation'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
  const { t } = useTranslation()
  const { user } = useLoggedUser()
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    logOut()
    router.push(`/`)
    handleCloseUserMenu()
  }

  const userSettings = settings.filter((item) => item.title !== DASHBOARD)
  const menuOptions = user?.isAdmin ? settings : userSettings

  const goTo = (setting: any) => () => {
    setting.callBack && handleLogout()
    setting.link && router.push(setting.link)
  }

  return (
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
            <MenuItem onClick={goTo(setting)} key={setting.title}>
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
  )
}

export default Login
