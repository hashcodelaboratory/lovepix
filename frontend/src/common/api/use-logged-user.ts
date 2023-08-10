import { onAuthStateChanged } from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'
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

  const checkIfAdmin = (user: User) => {
    const admin = admins?.find((item) => item.email === user.email)
    const newUser = { ...user, isAdmin: !!admin }
    setUser(newUser)
  }
  const callbackCheckIfAdmin = useCallback(checkIfAdmin, [admins])

  const getUser = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        setFetching(false)
        return
      }

      callbackCheckIfAdmin(user)
    })
    setFetching(false)
  }
  const callbackGetUser = useCallback(getUser, [callbackCheckIfAdmin])
  
  useEffect(() => {
    admins && callbackGetUser()
  }, [admins, callbackGetUser])

  return { user, fetching }
}

export default useLoggedUser
