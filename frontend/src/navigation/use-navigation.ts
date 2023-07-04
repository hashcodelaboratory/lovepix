import {CONFIGURATOR} from "../constants/pages/urls";
import {useRouter} from "next/router";

const useNavigation = () => {
  const {push} = useRouter()

  const navigateToConfigurator = () => push(CONFIGURATOR)

  return {
    navigateToConfigurator
  }
}

export default useNavigation