import { fireEvent, render } from '@testing-library/react'
import Carousel, { CarouselTestIds } from './carousel'
import { Configuration } from '../../../../common/types/configuration'

const mockedNavigateToConfigurator = jest.fn()
jest.mock('../../../../navigation/use-navigation', () => ({
  __esModule: true,
  default: () => ({
    navigateToConfigurator: mockedNavigateToConfigurator,
  }),
}))

describe('src/screens-content/home/components/carousel/carousel.tsx', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should invoke `navigateToConfigurator` on CTA button press', () => {
    const { getByTestId } = render(
      <Carousel configuration={{} as Configuration} />
    )

    const CTAButton = getByTestId(
      CarouselTestIds.navigateToConfiguratorButtonTestId
    )

    fireEvent.click(CTAButton)

    expect(mockedNavigateToConfigurator).toHaveBeenCalledTimes(1)
  })
})
