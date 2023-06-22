import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
