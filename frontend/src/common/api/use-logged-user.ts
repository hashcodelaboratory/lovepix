import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { User } from 'firebase/auth'
// import setSettingsAccess from 'set-settings-access'
import { settings } from 'navigation';
import * as SettingsTitles from 'constants/settings/titles';
import { useAdmins } from "common/api/use-admins";

const filtered = settings.filter(obj => {
  return obj.title !== SettingsTitles.DASHBOARD;
});

const useLoggedUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [fetching, setFetching] = useState(true)
  const { data: admins } = useAdmins()
  const [allowedSettings, setSettingAccess] = useState(filtered)
  const adminemails = admins?.map(({ email }) => email) ?? []

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        setFetching(false)
        setSettingAccess(filtered)
        return
      }

      setUser({ ...user })
      setFetching(false)
      setSettingAccess(settings)

      // for(let i=0; i < adminemails.length; i++){
      //   if (adminemails[i] == user.email){
      //     setSettingAccess(settings)
      //   }
      // }
    })
  }, [])

  return { user, fetching, allowedSettings }
}

export default useLoggedUser
