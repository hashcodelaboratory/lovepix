import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {appWithTranslation} from "next-i18next";
import {SnackbarProvider} from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}

export default appWithTranslation(MyApp)
