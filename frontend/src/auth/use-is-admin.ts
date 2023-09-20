import useLoggedUser from '../common/api/use-logged-user'

export const useIsAdmin = () => {
  const { user } = useLoggedUser()

  return user?.isAdmin ?? false
}
