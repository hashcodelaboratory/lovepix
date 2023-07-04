import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { User } from 'firebase/auth'

const useLoggedUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        setFetching(false)
        return
      }

      setUser({ ...user })
      setFetching(false)
    })
  }, [])

  return { user, fetching }
}

export default useLoggedUser
