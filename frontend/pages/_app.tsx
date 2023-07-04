import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import {SnackbarProvider} from 'notistack'
import {QueryClient, QueryClientProvider} from 'react-query'
import {useState} from 'react'
import {ReactQueryDevtools} from 'react-query/devtools'
import { Analytics } from '@vercel/analytics/react';

import 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsent from "../src/cookies/cookie-consent";

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          maxSnack={3}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
      <CookieConsent/>
      <Analytics/>
    </>
  )
}

export default appWithTranslation(MyApp)
