import { formatPrice } from './priceFormatting'

type formatType = {
  value: number | string
  lang: string
  expected: string
}

describe('/src/common/utils/priceFormatting', () => {
  it('Decimal number', () => {
    let tests: formatType[] = [
      { value: 0.5, lang: 'sk', expected: '0,50 €' },
      { value: 13.2, lang: 'en', expected: '€13.20' },
    ]

    tests.forEach((item) => {
      let result = formatPrice(item.value, item.lang)
      expect(normalize(result)).toStrictEqual(normalize(item.expected))
    })
  })

  it('Integer number', () => {
    let tests: formatType[] = [
      { value: 21, lang: 'sk', expected: '21,00 €' },
      { value: 0, lang: 'en', expected: '€0.00' },
    ]

    tests.forEach((item) => {
      let result = formatPrice(item.value, item.lang)
      expect(normalize(result)).toStrictEqual(normalize(item.expected))
    })
  })

  it('Negative number', () => {
    let tests: formatType[] = [
      { value: -10, lang: 'sk', expected: '-- €' },
      { value: -15.5, lang: 'en', expected: '€--' },
    ]

    tests.forEach((item) => {
      let result = formatPrice(item.value, item.lang)
      expect(normalize(result)).toStrictEqual(normalize(item.expected))
    })
  })

  it('String', () => {
    let tests: formatType[] = [
      { value: '134', lang: 'sk', expected: '-- €' },
      { value: 'hello', lang: 'en', expected: '€--' },
    ]

    tests.forEach((item) => {
      let result = formatPrice(item.value, item.lang)
      expect(normalize(result)).toStrictEqual(normalize(item.expected))
    })
  })
})

// needed because Intl module uses NonBreakingSpace between currency symbol -> '15.00\nbrs€'
const normalize = (
  input: string,
  utfNormalize: boolean = true,
  norm?: string
) => {
  const normalizeTable = [['\u00a0', ' ']]
  if (utfNormalize) input = input.normalize(norm)
  normalizeTable.forEach((item) => {
    input = input.replace(item[0], item[1])
  })
  return input
}
