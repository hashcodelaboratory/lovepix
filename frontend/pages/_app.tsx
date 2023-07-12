import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import {SnackbarProvider} from 'notistack'
import {QueryClient, QueryClientProvider} from 'react-query'
import {useState} from 'react'
import {ReactQueryDevtools} from 'react-query/devtools'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

import 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsent from "../src/cookies/cookie-consent";

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
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
