import { NextApiRequest, NextApiResponse } from 'next'
import create from '../../../../pages/api/superfaktura/create'
import axios from 'axios'

describe('pages/api/superfaktura/create.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('create', () => {
    describe('when request method is not POST', () => {
      it('should return `400` with bad request error', async () => {
        const mockedJson = jest.fn()
        const mockedStatusInvocation = jest
          .fn()
          .mockReturnValue({ json: mockedJson })

        await create(
          { method: 'GET' } as NextApiRequest,
          {
            status: (statusCode) => mockedStatusInvocation(statusCode),
          } as NextApiResponse
        )

        expect(mockedStatusInvocation).toHaveBeenCalledTimes(1)
        expect(mockedStatusInvocation).toHaveBeenCalledWith(400)
        expect(mockedJson).toHaveBeenCalledTimes(1)
        expect(mockedJson).toHaveBeenCalledWith({ error: 'Bad request!' })
      })
    })

    describe('when there is missing `invoice` attribute in body', () => {
      it('should return `400` with bad request error', async () => {
        const mockedJson = jest.fn()
        const mockedStatusInvocation = jest
          .fn()
          .mockReturnValue({ json: mockedJson })

        await create(
          {
            method: 'POST',
            body: '',
          } as NextApiRequest,
          {
            status: (statusCode) => mockedStatusInvocation(statusCode),
          } as NextApiResponse
        )

        expect(mockedStatusInvocation).toHaveBeenCalledTimes(1)
        expect(mockedStatusInvocation).toHaveBeenCalledWith(400)
        expect(mockedJson).toHaveBeenCalledTimes(1)
        expect(mockedJson).toHaveBeenCalledWith({ error: 'Bad request!' })
      })
    })
  })
})
