import * as Sentry from '@sentry/nextjs'

jest.mock('@sentry/nextjs')

describe('SentryService', () => {
  beforeEach(jest.clearAllMocks)

  describe('captureException', () => {
    it('should call Sentry.captureException with expected default parameters', () => {
      const { sentryService } = jest.requireActual('./sentry-service')

      sentryService.captureException(new Error('<test_exception>'))

      expect(Sentry.captureException).toHaveBeenCalledTimes(1)
      expect(Sentry.captureException).toHaveBeenCalledWith(
        new Error('<test_exception>'),
        undefined
      )
    })

    it('should call Sentry.captureException with expected additional information', () => {
      const { sentryService } = jest.requireActual('./sentry-service')

      sentryService.captureException(new Error('<test_exception>'), {
        user: {
          id: '<test_user_id>',
        },
      })

      expect(Sentry.captureException).toHaveBeenCalledTimes(1)
      expect(Sentry.captureException).toHaveBeenCalledWith(
        new Error('<test_exception>'),
        {
          user: {
            id: '<test_user_id>',
          },
        }
      )
    })
  })

  describe('captureMessage', () => {
    it('should call Sentry.captureMessage with expected default parameters', () => {
      const { sentryService } = jest.requireActual('./sentry-service')

      sentryService.captureMessage('<test_message>')

      expect(Sentry.captureMessage).toHaveBeenCalledTimes(1)
      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        '<test_message>',
        undefined
      )
    })

    it('should call Sentry.captureMessage with expected additional information', () => {
      const { sentryService } = jest.requireActual('./sentry-service')

      sentryService.captureMessage('<test_message>', {
        user: {
          id: '<test_user_id>',
        },
      })

      expect(Sentry.captureMessage).toHaveBeenCalledTimes(1)
      expect(Sentry.captureMessage).toHaveBeenCalledWith('<test_message>', {
        user: {
          id: '<test_user_id>',
        },
      })
    })
  })
})
