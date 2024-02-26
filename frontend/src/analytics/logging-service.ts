import { sentryService } from './sentry/sentry-service'
import { ExclusiveEventHintOrCaptureContext } from '@sentry/core/types/utils/prepareEvent'
import { CaptureContext, SeverityLevel } from '@sentry/types'
import { LovepixEvent } from './lovepix-event'

class LoggingService {
  logEvent = (event: LovepixEvent, data?: CaptureContext | SeverityLevel) =>
    sentryService.captureMessage(event, data)

  logException = (error: Error, data?: ExclusiveEventHintOrCaptureContext) =>
    sentryService.captureException(error, data)
}

export const loggingService = new LoggingService()
