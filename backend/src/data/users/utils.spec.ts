import {userEqualityPredicate} from "./utils";
import {User} from "./user";

const TEST_USER: User = {
  username: 'dominik',
  password: 'strong-password'
}

describe('utils', () => {
  describe('userEqualityPredicate', () => {
    it('should return `true` if username equals to user object username', () => {
      const result = userEqualityPredicate('dominik')(TEST_USER)

      expect(result).toBe(true)
    })

    it('should return `false` if username not equals to user objec tusername', () => {
      const result = userEqualityPredicate('secka')(TEST_USER)

      expect(result).toBe(false)
    })
  })
})