export const composeUrlWithQuery = (url: string, query: {[key: string]: string | boolean}) => {
  if (!query) {
    return url
  }

  const queryParams = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    queryParams.append(key, value.toString())
  }

  return url + `?${queryParams}`
}