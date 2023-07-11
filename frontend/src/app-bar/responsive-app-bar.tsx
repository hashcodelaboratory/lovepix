import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { appBarLeftItems, appBarRightItems, menuItems } from '../navigation'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import * as PagesUrls from '../constants/pages/urls'
import { Badge } from '@mui/material'
import { useRouter } from 'next/router'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable, orderTable } from '../../database.config'
import {
  CONFIGURATION_TABLE_KEY,
  ORDER_TABLE_KEY,
} from '../common/indexed-db/hooks/keys'
import logo from '../assets/logo_color.png'
import Image from 'next/image'
import { ImageLayout } from '../screens-content/home/enums/enums'
import styles from './responsive-app-bar.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import MenuIconComponent from './components/menu-sidebar/menu-icon/menu-icon'
import LogoComponent from './components/menu-sidebar/logo/logo'
import ConfiguratorComponent from './components/menu/configurator/configurator'

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

  const productsLength = order?.shoppingCart?.products?.length ?? 0
  const imagesLength = order?.shoppingCart?.images?.length ?? 0
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

  const navigate = () => {
    router.push('/')
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
            }}
          >
            <LogoComponent navigate={navigate} />
          </Typography>

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
                <Link href={link}>{String(t(title))}</Link>
              </Button>
            ))}
            <Image
              src={logo}
              layout={ImageLayout.FIXED}
              width={50}
              height={50}
              alt=''
              onClick={navigate}
              className={styles.icon}
            />
            {appBarRightItems.map(({ link, title }) => (
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
                <Link href={link}>{String(t(title))}</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <SearchIcon
              sx={{
                color: 'black',
                display: 'block',
                cursor: 'pointer',
              }}
            />
            <Link href={PagesUrls.SHOPPING_CART}>
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
            {/*<Tooltip title='Open settings'>*/}
            {/*  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
            {/*    <Avatar*/}
            {/*      alt={!!user ? user.displayName || '' : undefined}*/}
            {/*      src='/static/images/avatar/2.jpg'*/}
            {/*    />*/}
            {/*  </IconButton>*/}
            {/*</Tooltip>*/}
            {/*<Menu*/}
            {/*  sx={{ mt: '45px' }}*/}
            {/*  id='menu-sidebar-appbar'*/}
            {/*  anchorEl={anchorElUser}*/}
            {/*  anchorOrigin={{*/}
            {/*    vertical: 'top',*/}
            {/*    horizontal: 'right',*/}
            {/*  }}*/}
            {/*  keepMounted*/}
            {/*  transformOrigin={{*/}
            {/*    vertical: 'top',*/}
            {/*    horizontal: 'right',*/}
            {/*  }}*/}
            {/*  open={Boolean(anchorElUser)}*/}
            {/*  onClose={handleCloseUserMenu}*/}
            {/*>*/}
            {/*  {user ? (*/}
            {/*    settings.map((setting) => {*/}
            {/*      const menuItem = (*/}
            {/*        <MenuItem*/}
            {/*          key={setting.title}*/}
            {/*          onClick={() => setting.callBack && handleLogout()}*/}
            {/*        >*/}
            {/*          <Typography textAlign='center'>*/}
            {/*            {setting.title}*/}
            {/*          </Typography>*/}
            {/*        </MenuItem>*/}
            {/*      )*/}

            {/*      if (setting.callBack) {*/}
            {/*        return menuItem*/}
            {/*      } else {*/}
            {/*        return (*/}
            {/*          <Link key={uuidv4()} href={setting.link}>*/}
            {/*            {menuItem}*/}
            {/*          </Link>*/}
            {/*        )*/}
            {/*      }*/}
            {/*    })*/}
            {/*  ) : (*/}
            {/*    <MenuItem onClick={logIn}>*/}
            {/*      <Typography textAlign='center'>Login</Typography>*/}
            {/*    </MenuItem>*/}
            {/*  )}*/}
            {/*</Menu>*/}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
