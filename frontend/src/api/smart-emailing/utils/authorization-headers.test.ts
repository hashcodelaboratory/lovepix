import {authorizationHeaders, authorizationHeaders_test} from "./authorization-headers";

describe('api/smart-emailing/utils/authorization-headers.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return expected authorization headers object', () => {
    const result = authorizationHeaders()

    expect(result).toStrictEqual({Authorization: "<smart_emailing_token>"})
  })
})