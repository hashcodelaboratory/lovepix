import register from "../../../pages/api/smart-emailing/register";
import {NextApiRequest, NextApiResponse} from "next";
import {registerEndpoint} from "../utils/endpoint-composer";
import authorizationHeaders from "../utils/authorization-headers";
import {logRequestTrigger} from "../../logger/logger";
import axios from "axios";

jest.mock("../../../api/smart-emailing/utils/endpoint-composer", () => ({
  registerEndpoint: jest.fn()
}))

jest.mock("../../../api/smart-emailing/utils/authorization-headers", () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock("../../../api/logger/logger", () => ({
  logRequestTrigger: jest.fn()
}))

jest.mock('axios', () => ({
  post: jest.fn()
}))

describe('pages/api/smart-emailing/register.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('register', () => {
    describe('when request method is not `POST`', () => {
      it('should return `400` with bad request error', async () => {
        const mockedJson = jest.fn()
        const mockedStatusInvocation = jest.fn().mockReturnValue({json: mockedJson})

        await register({method: 'GET'} as NextApiRequest, {status: (statusCode) => mockedStatusInvocation(statusCode)} as NextApiResponse)

        expect(mockedStatusInvocation).toHaveBeenCalledTimes(1)
        expect(mockedStatusInvocation).toHaveBeenCalledWith(400)
        expect(mockedJson).toHaveBeenCalledTimes(1)
        expect(mockedJson).toHaveBeenCalledWith({error: 'Bad request!'})
      })
    })

    describe('when there is missing `email` attribute in body', () => {
      it('should return `400` with bad request error', async () => {
        const mockedJson = jest.fn()
        const mockedStatusInvocation = jest.fn().mockReturnValue({json: mockedJson})

        await register({
          method: 'POST',
          body: {}
        } as NextApiRequest, {status: (statusCode) => mockedStatusInvocation(statusCode)} as NextApiResponse)

        expect(mockedStatusInvocation).toHaveBeenCalledTimes(1)
        expect(mockedStatusInvocation).toHaveBeenCalledWith(400)
        expect(mockedJson).toHaveBeenCalledTimes(1)
        expect(mockedJson).toHaveBeenCalledWith({error: 'Bad request!'})
      })
    })

    it('should invoke `registerEndpoint`', async () => {
      (registerEndpoint as jest.Mock).mockReturnValue({href: '<register_endpoint>'});

      await register({
        method: 'POST',
        body: {email: 'secka.dominik@gmail.com'}
        // @ts-ignore
      } as NextApiRequest, {status: jest.fn().mockReturnValue({json: jest.fn()})} as NextApiResponse)

      expect(registerEndpoint).toHaveBeenCalledTimes(1)
      expect(registerEndpoint).toHaveBeenCalledWith()
    })

    it('should invoke `authorizationHeaders`', async () => {
      (registerEndpoint as jest.Mock).mockReturnValue({href: '<register_endpoint>'});

      await register({
        method: 'POST',
        body: {email: 'secka.dominik@gmail.com'}
        // @ts-ignore
      } as NextApiRequest, {status: jest.fn().mockReturnValue({json: jest.fn()})} as NextApiResponse)

      expect(authorizationHeaders).toHaveBeenCalledTimes(1)
      expect(authorizationHeaders).toHaveBeenCalledWith()
    })

    it('should invoke `logRequestTrigger` with expected parameters', async () => {
      (registerEndpoint as jest.Mock).mockReturnValue({href: '<register_endpoint>'});

      await register({
        method: 'POST',
        body: {email: 'secka.dominik@gmail.com'}
        // @ts-ignore
      } as NextApiRequest, {status: jest.fn().mockReturnValue({json: jest.fn()})} as NextApiResponse)

      expect(logRequestTrigger).toHaveBeenCalledTimes(1)
      expect(logRequestTrigger).toHaveBeenCalledWith("<register_endpoint>", "POST", {email: "secka.dominik@gmail.com"})
    })

    it('should invoke `axios` `POST` method with expected configuration', async () => {
      (registerEndpoint as jest.Mock).mockReturnValue({href: '<register_endpoint>'});
      (authorizationHeaders as jest.Mock).mockReturnValue({Authorization: '<authorization_token>'});

      await register({
        method: 'POST',
        body: {email: 'secka.dominik@gmail.com'}
        // @ts-ignore
      } as NextApiRequest, {status: jest.fn().mockReturnValue({json: jest.fn()})} as NextApiResponse)

      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(
        "<register_endpoint>",
        {
          settings: {update: true},
          data: [{
            contactlists: [{
              id: '<smart_emailing_contact_list_id>',
              status: 'confirmed'
            }], emailaddress: 'secka.dominik@gmail.com'
          }],
        },
        {
          headers: {
            Authorization: '<authorization_token>'
          }
        }
      )
    })

    it('should return 201 with expected request result data', async () => {
      (registerEndpoint as jest.Mock).mockReturnValue({href: '<register_endpoint>'});
      (authorizationHeaders as jest.Mock).mockReturnValue({Authorization: '<authorization_token>'});

      (axios.post as jest.Mock).mockReturnValue({data: '<test_data>'});
      const mockedJson = jest.fn()
      const mockedStatusInvocation = jest.fn().mockReturnValue({json: mockedJson})

      await register({
        method: 'POST',
        body: {email: 'secka.dominik@gmail.com'}
        // @ts-ignore
      } as NextApiRequest, {status: (statusCode) => mockedStatusInvocation(statusCode)} as NextApiResponse)

      expect(mockedStatusInvocation).toHaveBeenCalledTimes(1);
      expect(mockedStatusInvocation).toHaveBeenCalledWith(201);
      expect(mockedJson).toHaveBeenCalledTimes(1)
      expect(mockedJson).toHaveBeenCalledWith("<test_data>")
    })

    describe('when there is error thrown during request processing', () => {
      it('should return 500 with expected error message', async () => {
        (registerEndpoint as jest.Mock).mockImplementation(() => {
          throw new Error('<test_error>')
        });

        const mockedJson = jest.fn()
        const mockedStatusInvocation = jest.fn().mockReturnValue({json: mockedJson})

        await register({
          method: 'POST',
          body: {email: 'secka.dominik@gmail.com'}
          // @ts-ignore
        } as NextApiRequest, {status: (statusCode) => mockedStatusInvocation(statusCode)} as NextApiResponse)

        expect(mockedStatusInvocation).toHaveBeenCalledTimes(1);
        expect(mockedStatusInvocation).toHaveBeenCalledWith(500);
        expect(mockedJson).toHaveBeenCalledTimes(1)
        expect(mockedJson).toHaveBeenCalledWith({error: "<test_error>"})
      })
    })
  })
})