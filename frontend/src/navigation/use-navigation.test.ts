import {renderHook} from "@testing-library/react";
import useNavigation from "./use-navigation";
import {CONFIGURATOR} from "../constants/pages/urls";

const mockedPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: (route: string) => mockedPush(route)
  })
}))

describe('src/navigation/use-navigation.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('useNavigation', () => {
    describe('navigateToConfigurator', () => {
      it('should invoke `useRouter` `push` with configurator route identifier', () => {
        const { result: { current: { navigateToConfigurator } } } = renderHook(() => useNavigation())

        navigateToConfigurator()

        expect(mockedPush).toHaveBeenCalledTimes(1)
        expect(mockedPush).toHaveBeenCalledWith(CONFIGURATOR)
      })
    })
  })
})