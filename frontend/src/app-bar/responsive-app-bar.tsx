import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { appBarLeftItems, appBarRightItems, menuItems } from '../navigation'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Pages } from '../constants/pages/urls'
import { Avatar, Badge } from '@mui/material'
import { useRouter } from 'next/router'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable, orderTable } from '../../database.config'
import {
  CONFIGURATION_TABLE_KEY,
  ORDER_TABLE_KEY,
} from '../common/indexed-db/hooks/keys'
import styles from './responsive-app-bar.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIconComponent from './components/menu-sidebar/menu-icon/menu-icon'
import LogoComponent from './components/menu-sidebar/logo/logo'
import ConfiguratorComponent from './components/menu/configurator/configurator'
import Button from '@mui/material/Button'
import useLoggedUser from '../common/api/use-logged-user'
import { logOut } from '../auth'

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { t } = useTranslation()

  const router = useRouter()

  const { user } = useLoggedUser()

  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  )

  const productsLength = order?.shoppingCart?.products?.length ?? 0
  const imagesLength = order?.shoppingCart?.images?.length ?? 0
  const totalLength = imagesLength + productsLength

  const BADGE_NUMBER = totalLength || 0

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const navigate = () => {
    router.push('/')
  }

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logOut()
    handleClose()
    await router.push('/')
  }

  return (
    <AppBar position='fixed' sx={{ backgroundColor: 'white' }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MenuIconComponent open={handleOpenNavMenu} />
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
              {menuItems.map((page) => (
                <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link href={t(page.link)}>{t(page.title)}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 3,
            }}
          >
            <LogoComponent navigate={navigate} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ConfiguratorComponent
              close={handleCloseNavMenu}
              origin={configuration?.origin}
            />
            {appBarLeftItems.map(({ link, title }) => (
              <Link key={uuidv4()} href={t(link)}>
                <p className={styles.link} onClick={handleCloseNavMenu}>
                  {String(t(title))}
                </p>
              </Link>
            ))}
            <LogoComponent navigate={navigate} />
            {appBarRightItems.map(({ link, title }) => (
              <Link key={uuidv4()} href={t(link)}>
                <p className={styles.link} onClick={handleCloseNavMenu}>
                  {String(t(title))}
                </p>
              </Link>
            ))}
          </Box>
          <Box className={styles.navbarRow}>
            {user ? (
              <div>
                <Button onClick={handleClick}>
                  <div className={styles.accountRow}>
                    <Avatar
                      alt={!!user ? user.displayName || '' : undefined}
                      src={user?.photoURL ?? ''}
                      imgProps={{ referrerPolicy: 'no-referrer' }}
                      sx={{ width: 30, height: 30, marginRight: 1 }}
                    />
                    <p className={styles.accountTextLogged}>
                      {user.displayName ?? user.email}
                    </p>
                    <KeyboardArrowDownIcon style={{ color: 'gray' }} />
                  </div>
                </Button>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      router.push(Pages.PROFILE)
                    }}
                  >
                    <p className={styles.menuText}>Objednávky</p>
                  </MenuItem>
                  {/*<MenuItem*/}
                  {/*  onClick={() => {*/}
                  {/*    router.push(Pages.PROFILE)*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <p className={styles.menuText}>Môj profil</p>*/}
                  {/*</MenuItem>*/}
                  {user?.isAdmin && (
                    <MenuItem
                      onClick={() => {
                        router.push(Pages.DASHBOARD)
                      }}
                    >
                      <p className={styles.menuText}>Dashboard</p>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <p className={styles.menuText}>
                      <b>Odhlásiť sa</b>
                    </p>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                onClick={() => {
                  router.push('/login')
                }}
              >
                <div className={styles.accountRow}>
                  <PersonIcon style={{ color: 'gray', marginRight: 8 }} />
                  <div className={styles.accountCol}>
                    <p className={styles.accountTitle}>Môj Lovepix</p>
                    <p className={styles.accountText}>Prihlásiť sa</p>
                  </div>
                </div>
              </Button>
            )}
            <Link href={t(Pages.SHOPPING_CART)}>
              <Badge
                badgeContent={BADGE_NUMBER}
                color='error'
                sx={{ my: 2, marginRight: 2, marginLeft: 2 }}
              >
                <ShoppingCartIcon
                  sx={{ color: 'black', display: 'block', cursor: 'pointer' }}
                />
              </Badge>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
