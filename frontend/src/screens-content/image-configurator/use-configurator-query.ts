import {useMemo} from "react";
import {useRouter} from "next/router";

export const useConfiguratorQuery = () => {
  const router = useRouter()

  return useMemo(() => {
    const {query} = router;
    if (!query) {
      return undefined
    }

    const validArgs = ["material","image","dimensionId","origin"]
    return Object.fromEntries(Object.entries(query).filter(([key]) => validArgs.includes(key)))
  }, [router.query])
}