import {imageSource, imageSourceSet} from "./utils";

const TEST_SOURCE_URL = '<test_source_url>'

describe('src/screens-content/home/components/upload-image/utils.ts', () => {
  describe('imageSource', () => {
    it('should return expected source url with query configuration', () => {
      const result = imageSource(TEST_SOURCE_URL)

      expect(result).toStrictEqual('<test_source_url>?w=248&fit=crop&auto=format')
    })
  })

  describe('imageSourceSet', () => {
    it('should return expected source url with query configuration', () => {
      const result = imageSourceSet(TEST_SOURCE_URL)

      expect(result).toStrictEqual('<test_source_url>?w=248&fit=crop&auto=format&dpr=2 2x')
    })
  })
})