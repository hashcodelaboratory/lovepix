import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Analytics } from '@vercel/analytics/react'
import 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import CookieConsent from '../src/cookies/cookie-consent'
import { withMetadata } from '../src/metadata/with-metadata'
import { withFavicon } from '../src/favicon/with-favicon'
import { orderTable } from '../database.config'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'

const addInitialShoppingCart = async () =>
  (await orderTable.count()) === 0 &&
  orderTable.add(
    {
      shoppingCart: { images: [], products: [], totalPrice: 0 },
    },
    ORDER_TABLE_KEY
  )

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    addInitialShoppingCart()
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/*// @ts-ignore*/}
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          maxSnack={3}
        >
          {/*// @ts-ignore*/}
          <Component {...pageProps} />
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <CookieConsent />
      <Analytics />
    </>
  )
}

export default withFavicon(appWithTranslation(withMetadata(MyApp)))
