import * as Sentry from '@sentry/nextjs'

describe('SentryService', () => {
  beforeEach(jest.clearAllMocks)

  describe('captureException', () => {
    it('should call Sentry.captureException with expected default parameters', () => {
      const { sentryService } = jest.requireActual('./sentry-service')
      const captureExceptionSpy = jest.spyOn(Sentry, 'captureException')

      sentryService.captureException(new Error('<test_exception>'))

      expect(captureExceptionSpy).toHaveBeenCalledTimes(1)
      expect(captureExceptionSpy).toHaveBeenCalledWith(
        new Error('<test_exception>'),
        undefined
      )
    })

    it('should call Sentry.captureException with expected additional information', () => {
      const { sentryService } = jest.requireActual('./sentry-service')
      const captureExceptionSpy = jest.spyOn(Sentry, 'captureException')

      sentryService.captureException(new Error('<test_exception>'), {
        user: {
          id: '<test_user_id>',
        },
      })

      expect(captureExceptionSpy).toHaveBeenCalledTimes(1)
      expect(captureExceptionSpy).toHaveBeenCalledWith(
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
      const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage')

      sentryService.captureMessage('<test_message>')

      expect(captureMessageSpy).toHaveBeenCalledTimes(1)
      expect(captureMessageSpy).toHaveBeenCalledWith(
        '<test_message>',
        undefined
      )
    })

    it('should call Sentry.captureMessage with expected additional information', () => {
      const { sentryService } = jest.requireActual('./sentry-service')
      const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage')

      sentryService.captureMessage('<test_message>', {
        user: {
          id: '<test_user_id>',
        },
      })

      expect(captureMessageSpy).toHaveBeenCalledTimes(1)
      expect(captureMessageSpy).toHaveBeenCalledWith('<test_message>', {
        user: {
          id: '<test_user_id>',
        },
      })
    })
  })
})
