export const isIosSafari = () => {
  const userAgent = window.navigator.userAgent
  const isIos = /iPad|iPhone|iPod/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && !/CriOS/.test(userAgent)
  return isIos && isSafari
}
