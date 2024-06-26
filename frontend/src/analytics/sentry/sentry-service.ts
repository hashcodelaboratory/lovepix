import * as Sentry from '@sentry/nextjs'
import { ExclusiveEventHintOrCaptureContext } from '@sentry/core/types/utils/prepareEvent'
import { CaptureContext, Severity, SeverityLevel } from '@sentry/types'

class SentryService {
  captureException = (
    error: Error,
    hint?: ExclusiveEventHintOrCaptureContext
  ) => Sentry.captureException(error, hint)

  captureMessage = (
    message: string,
    captureContext?: CaptureContext | SeverityLevel
  ) => {
    Sentry.withScope((scope) => {
      scope.setExtra(
        'extra',
        captureContext ? (captureContext as any).extra ?? null : null
      )
      Sentry.captureMessage(message, captureContext)
    })
  }
}

export const sentryService = new SentryService()
