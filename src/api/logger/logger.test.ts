import {logRequestTrigger} from "./logger";

describe('api/logger/logger.ts', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('logRequestTrigger', () => {
    it('should invoke `console.log` with expected parameters', () => {
      const consoleLogSpy = jest.spyOn(console, 'log')

      logRequestTrigger('<uri>', '<method>', {data: '<test_data>'})

      expect(consoleLogSpy).toHaveBeenCalledTimes(1)
      expect(consoleLogSpy).toHaveBeenCalledWith('🔫', '<method>', '<uri>', {data: '<test_data>'})
    })
  })
})