import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { User } from 'firebase/auth'
import { useAdmins } from 'common/api/use-admins'

type UserAdmin = {
  isAdmin: boolean
}


const useLoggedUser = () => {
  const [user, setUser] = useState<(User & UserAdmin) | null>(null)
  const [fetching, setFetching] = useState(true)
  const { data: admins } = useAdmins()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        setFetching(false)
        return
      }

      const admin = admins?.find((item) => item.email === user.email)

      setUser({ ...user, isAdmin: !!admin })
      setFetching(false)
    })
  }, [admins])

  return { user, fetching }
}

export default useLoggedUser
