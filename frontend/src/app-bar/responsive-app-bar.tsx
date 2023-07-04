import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { pages, settings } from '../navigation'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import * as PagesUrls from '../constants/pages/urls'
import { Badge } from '@mui/material'
import { logIn, logOut } from 'auth'
import useLoggedUser from 'common/api/use-logged-user'
import { useRouter } from 'next/router'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable, orderTable } from '../../database.config'
import {
  CONFIGURATION_TABLE_KEY,
  ORDER_TABLE_KEY,
} from '../common/indexed-db/hooks/keys'
import * as PagesTitles from '../constants/pages/titles'

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const { t } = useTranslation()

  const router = useRouter()

  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  )

  const productsLength = order?.shoppingCart?.products?.length
  const imagesLength = order?.shoppingCart?.images?.length
  const totalLength = imagesLength + productsLength

  const BADGE_NUMBER = totalLength || 0

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { user } = useLoggedUser()

  const handleLogout = () => {
    logOut()
    router.push(`/`)
    handleCloseUserMenu()
  }

  return (
    <AppBar position='fixed' sx={{ backgroundColor: 'white' }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            waller
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link href={PagesUrls.CONFIGURATOR}>
                    {String(t(PagesTitles.CONFIGURATOR))}
                  </Link>
                </Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link href={page.link}>{page.title}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            waller
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={uuidv4()}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mx: 1,
                color: 'black',
                display: 'block',
                fontFamily: 'monospace',
              }}
            >
              <Link href={PagesUrls.CONFIGURATOR}>
                <Badge
                  badgeContent={configuration?.origin ? '!' : 0}
                  color='warning'
                >
                  {String(t(PagesTitles.CONFIGURATOR))}
                </Badge>
              </Link>
            </Button>
            {pages.map((page) => (
              <Button
                key={uuidv4()}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: 'black',
                  display: 'block',
                  fontFamily: 'monospace',
                }}
              >
                <Link href={page.link}>{String(t(page.title))}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Link href={PagesUrls.SHOPPING_CART}>
              <Badge
                badgeContent={BADGE_NUMBER}
                color='error'
                sx={{ my: 2, marginRight: 2 }}
              >
                <ShoppingCartIcon
                  sx={{ color: 'black', display: 'block', cursor: 'pointer' }}
                />
              </Badge>
            </Link>
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
              id='menu-appbar'
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
                settings.map((setting) => {
                  const menuItem = (
                    <MenuItem
                      key={setting.title}
                      onClick={() => setting.callBack && handleLogout()}
                    >
                      <Typography textAlign='center'>
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  )

                  if (setting.callBack) {
                    return menuItem
                  } else {
                    return (
                      <Link key={uuidv4()} href={setting.link}>
                        {menuItem}
                      </Link>
                    )
                  }
                })
              ) : (
                <MenuItem onClick={logIn}>
                  <Typography textAlign='center'>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
