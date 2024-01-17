import * as Sentry from '@sentry/nextjs'

jest.mock('@sentry/nextj')

describe('SentryService', () => {
  describe('captureException', () => {
    const { sentryService } = jest.requireActual('./sentry-service')

    sentryService.captureException(new Error('<test_exception>'))

    expect(Sentry.captureException).toHave
  })

  describe('captureMessage', () => {
    const { sentryService } = jest.requireActual('./sentry-service')
  })
})
