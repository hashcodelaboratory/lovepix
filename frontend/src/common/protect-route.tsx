import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import useLoggedUser from 'common/api/use-logged-user'
import Custom404 from '../../pages/404'

const AdminAccess = ({ children }: any) => {
  const { user, fetching } = useLoggedUser()

  if (fetching && user?.isAdmin == undefined) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetching}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }

  if (!user?.isAdmin && !fetching) {
    return <Custom404 />
  }

  return children
}

export default AdminAccess
