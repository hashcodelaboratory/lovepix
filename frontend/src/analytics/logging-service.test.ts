import { LovepixEvent } from './lovepix-event'
import { sentryService } from './sentry/sentry-service'
import { SeverityLevel } from '@sentry/types'

jest.mock('./sentry/sentry-service')

describe('LoggingService', () => {
  beforeEach(jest.clearAllMocks)

  describe('logEvent', () => {
    it('should integrate sentryService.captureMessage with expected parameters', () => {
      const { loggingService } = jest.requireActual('./logging-service')

      loggingService.logEvent(
        LovepixEvent.EXAMPLE_EVENT,
        'info' as SeverityLevel
      )

      expect(sentryService.captureMessage).toHaveBeenCalledTimes(1)
      expect(sentryService.captureMessage).toHaveBeenCalledWith(
        'example_event',
        'info'
      )
    })
  })

  describe('logException', () => {
    it('should integrate sentryService.captureException with expected parameters', () => {
      const { loggingService } = jest.requireActual('./logging-service')

      const error = new Error('<test_error>')
      loggingService.logException(error, { user: { id: '<test_user_id>' } })

      expect(sentryService.captureException).toHaveBeenCalledTimes(1)
      expect(sentryService.captureException).toHaveBeenCalledWith(error, {
        user: { id: '<test_user_id>' },
      })
    })
  })
})
