export const defaultNumberFormatOptions: Intl.NumberFormatOptions = {
  style: 'currency',
  currencyDisplay: 'symbol',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
}

export const formatPrice = (
  price: any,
  language: string = 'sk',
  formatOptions: Intl.NumberFormatOptions = defaultNumberFormatOptions
) => {
  let formatter = new Intl.NumberFormat(language, formatOptions)
  if (typeof price !== 'number' || price < 0) {
    return formatter.format(NaN).replace('NaN', '--')
  }
  return formatter.format(price)
}
