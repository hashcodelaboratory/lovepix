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
import flag_sk from '../assets/flag-sk.png'
import flag_en from '../assets/flag-en.png'
import Image, { StaticImageData } from 'next/image'
import { ImageLayout } from '../screens-content/home/enums/enums'
import styles from './responsive-app-bar.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import MenuIconComponent from './components/menu-sidebar/menu-icon/menu-icon'
import LogoComponent from './components/menu-sidebar/logo/logo'
import ConfiguratorComponent from './components/menu/configurator/configurator'

const LanguageSwitch = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(document.getElementById("lang-flag"));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {i18n} = useTranslation();

  const router = useRouter();
  const languages = new Map<string, StaticImageData>([
    ["sk", flag_sk],
    ["en", flag_en],
  ])

  function langSwitch(event: React.MouseEvent<HTMLElement>) {
    i18n.changeLanguage(event.currentTarget.getAttribute("data-lang") ?? "sk");

    router.push('','',{locale: i18n.language});
  }

  let langItems = [];
  for (const [lang, flag] of Array.from(languages)) {
    if(lang !== i18n.language){
      langItems.push(
        <MenuItem onClick={langSwitch} data-lang={lang} sx={{padding: "3px 8px"}} selected={false} autoFocus={false}>
          <Image
            src={flag}
            layout={ImageLayout.FIXED}
            width={32}
            height={32}
            alt=''
            className={styles.icon}/>
        </MenuItem>
      )
    }
  }
  const lang_code:string = languages.has(i18n.language)? i18n.language : "sk";
  const flag:StaticImageData = languages.get(lang_code)!;
  return (
    <div style={{marginLeft: "0.6em"}}>
      <Box sx={{cursor: "pointer", display: "flex", alignItems: "center", alignContent: "center"}} 
        aria-controls={open ? 'lang-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
      <Image
        id="lang-flag"
        src={flag}
        layout={ImageLayout.FIXED}
        width={32}
        height={32}
        alt=''
        className={styles.langIcon}
        style={{display: "inline-block"}}
      />
      <div className={styles.langArrow}></div>
      </Box>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableAutoFocusItem={true}
        PaperProps={{
          style: {
            maxHeight: 200,
          },
        }}
      >
        {langItems}
      </Menu>
    </div>
  )
} 

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
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
              <Link key={uuidv4()} href={link} onClick={handleCloseNavMenu}>
                <p className={styles.link}>{String(t(title))}</p>
              </Link>
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
              <Link key={uuidv4()} onClick={handleCloseNavMenu} href={link}>
                <p className={styles.link}>{String(t(title))}</p>
              </Link>
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
            {/*<LanguageSwitch></LanguageSwitch>*/}
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
