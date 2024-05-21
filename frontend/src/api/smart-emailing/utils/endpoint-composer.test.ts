import {withHost, withHost_test} from "./with-host";
import {registerEndpoint, statusEndpoint} from "./endpoint-composer";
import Endpoint from "../endpoint";

jest.mock('./with-host', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('api/smart-emailing/utils/endpoint-composer.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('statusEndpoint', () => {
    it('should invoke `withHost` with expected parameter', () => {
      (withHost as jest.Mock).mockReturnValue('<return_value>');
      const result = statusEndpoint()

      expect(withHost).toHaveBeenCalledTimes(1)
      expect(withHost).toHaveBeenCalledWith(Endpoint.status)
      expect(result).toStrictEqual('<return_value>')
    })
  })

  describe('registerEndpoint', () => {
    it('should invoke `withHost` with expected parameter', () => {
      (withHost as jest.Mock).mockReturnValue('<return_value>');
      const result = registerEndpoint()

      expect(withHost).toHaveBeenCalledTimes(1)
      expect(withHost).toHaveBeenCalledWith(Endpoint.register)
      expect(result).toStrictEqual('<return_value>')
    })
  })
})