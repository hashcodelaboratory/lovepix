import {fireEvent, render} from "@testing-library/react";
import Carousel, {CarouselTestIds} from "./carousel";

const mockedNavigateToConfigurator = jest.fn()
jest.mock("../../../../navigation/use-navigation", () => ({
  __esModule: true,
  default: () => ({
    navigateToConfigurator: mockedNavigateToConfigurator
  })
}))

describe('src/screens-content/home/components/carousel/carousel.tsx', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should invoke `navigateToConfigurator` on CTA button press', () => {
    const {getByTestId} = render(<Carousel/>)

    const CTAButton = getByTestId(CarouselTestIds.navigateToConfiguratorButtonTestId)

    fireEvent.click(CTAButton)

    expect(mockedNavigateToConfigurator).toHaveBeenCalledTimes(1)
  })
})