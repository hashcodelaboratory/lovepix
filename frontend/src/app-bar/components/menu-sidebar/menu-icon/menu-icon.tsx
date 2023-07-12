import IconButton from '@mui/material/IconButton'
import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  open: (event: React.MouseEvent<HTMLElement>) => void
}
const MenuIconComponent = ({ open }: Props) => {
  return (
    <IconButton
      size='large'
      aria-label='account of current user'
      aria-controls='menu-appbar'
      aria-haspopup='true'
      onClick={open}
      sx={{ color: 'black' }}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default MenuIconComponent
