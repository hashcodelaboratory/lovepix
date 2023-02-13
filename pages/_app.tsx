import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import AppContextProvider from '../src/app-context/app-context-provider'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </AppContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
