import status from '../../../../pages/api/smart-emailing/status'
import { NextApiRequest, NextApiResponse } from 'next'
import { statusEndpoint } from '../utils/endpoint-composer'
import authorizationHeaders from '../utils/authorization-headers'
import { logRequestTrigger } from '../../logger/logger'
import axios from 'axios'

jest.mock('../../../api/smart-emailing/utils/endpoint-composer', () => ({
  statusEndpoint: jest.fn(),
}))

jest.mock('../../../api/smart-emailing/utils/authorization-headers', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../api/logger/logger', () => ({
  logRequestTrigger: jest.fn(),
}))

jest.mock('axios', () => ({
  get: jest.fn(),
}))

describe('pages/api/smart-emailing/status.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('status', () => {
    it('should integrate `statusEndpoint` invocation', async () => {
      // TODO: #521: fix ts-error
      // @ts-ignore
      // await status(
      //   {} as NextApiRequest,
      //   {
      //     status: jest.fn().mockReturnValue({ json: jest.fn() }),
      //   } as NextApiResponse
      // )

      expect(statusEndpoint).toHaveBeenCalledTimes(1)
      expect(statusEndpoint).toHaveBeenCalledWith()
    })

    it('should integrate `authorizationHeaders` invocation', async () => {
      ;(statusEndpoint as jest.Mock).mockReturnValue({
        href: '<status_endpoint>',
      })
      // TODO: #521: fix ts-error
      // @ts-ignore
      // await status(
      //   {} as NextApiRequest,
      //   {
      //     status: jest.fn().mockReturnValue({ json: jest.fn() }),
      //   } as NextApiResponse
      // )

      expect(authorizationHeaders).toHaveBeenCalledTimes(1)
      expect(authorizationHeaders).toHaveBeenCalledWith()
    })

    it('should log request trigger with expected information', async () => {
      ;(statusEndpoint as jest.Mock).mockReturnValue({
        href: '<status_endpoint>',
      })
      // TODO: #521: fix ts-error
      // @ts-ignore
      // await status(
      //   { method: 'GET' } as NextApiRequest,
      //   {
      //     status: jest.fn().mockReturnValue({ json: jest.fn() }),
      //   } as NextApiResponse
      // )

      expect(logRequestTrigger).toHaveBeenCalledTimes(1)
      expect(logRequestTrigger).toHaveBeenCalledWith('<status_endpoint>', 'GET')
    })

    it('should invoke `axios` get with expected request composition', async () => {
      ;(statusEndpoint as jest.Mock).mockReturnValue({
        href: '<status_endpoint>',
      })
      ;(authorizationHeaders as jest.Mock).mockReturnValue({
        Authorization: '<authorization_token>',
      })
      // TODO: #521: fix ts-error
      // @ts-ignore
      // await status(
      //   {} as NextApiRequest,
      //   {
      //     status: jest.fn().mockReturnValue({ json: jest.fn() }),
      //   } as NextApiResponse
      // )

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith('<status_endpoint>', {
        headers: { Authorization: '<authorization_token>' },
      })
    })

    it('should return 200 with expected request result data', async () => {
      ;(statusEndpoint as jest.Mock).mockReturnValue({
        href: '<status_endpoint>',
      })
      ;(axios.get as jest.Mock).mockReturnValue({ data: '<test_data>' })
      const mockedJson = jest.fn()
      const mockedStatusInvocation = jest
        .fn()
        .mockReturnValue({ json: mockedJson })
      // @ts-ignore
      await status(
        {} as NextApiRequest,
        {
          status: (statusCode) => mockedStatusInvocation(statusCode),
        } as NextApiResponse
      )

      expect(mockedStatusInvocation).toHaveBeenCalledTimes(1)
      expect(mockedStatusInvocation).toHaveBeenCalledWith(200)
      expect(mockedJson).toHaveBeenCalledTimes(1)
      expect(mockedJson).toHaveBeenCalledWith('<test_data>')
    })

    describe('when there is some thrown exception', () => {
      it('should return 500 with expected failure status', async () => {
        ;(statusEndpoint as jest.Mock).mockImplementation(() => {
          throw new Error('<test_error_message>')
        })
        ;(axios.get as jest.Mock).mockReturnValue({ data: '<test_data>' })
        const mockedJson = jest.fn()
        const mockedStatusInvocation = jest
          .fn()
          .mockReturnValue({ json: mockedJson })
        // @ts-ignore
        await status(
          {} as NextApiRequest,
          {
            status: (statusCode) => mockedStatusInvocation(statusCode),
          } as NextApiResponse
        )

        expect(mockedStatusInvocation).toHaveBeenCalledTimes(1)
        expect(mockedStatusInvocation).toHaveBeenCalledWith(500)
        expect(mockedJson).toHaveBeenCalledTimes(1)
        expect(mockedJson).toHaveBeenCalledWith({
          message: '<test_error_message>',
          status: 'NOK',
        })
      })
    })
  })
})
