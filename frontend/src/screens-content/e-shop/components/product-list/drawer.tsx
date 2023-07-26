import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import styles from './product-list.module.scss'
import CategoriesSidebar from './categories-sidebar'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CategoriesSidebar />
    </Box>
  )

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button
          onClick={toggleDrawer('left', true)}
          className={styles.buttonHamburger}
        >
          <MenuIcon className={styles.hamburger} />
        </Button>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
