import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {appWithTranslation} from "next-i18next";
import {SnackbarProvider} from "notistack";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
import {ReactQueryDevtools} from "react-query/devtools";
import AppContext from "../src/app-context/app-context";

function MyApp({ Component, pageProps }: AppProps) {

    const [queryClient] = useState(() => new QueryClient());
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>();

    const CONTEXT_VALUE = {
        state: {
            uploadedImageUrl: uploadedImageUrl
        },
        stateAction: {
            setUploadedImageUrl: setUploadedImageUrl
        }
    }

    return (
        <AppContext.Provider value={CONTEXT_VALUE}>
          <QueryClientProvider client={queryClient}>
              <SnackbarProvider>
                  <Component {...pageProps} />
              </SnackbarProvider>
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AppContext.Provider>
    );
}

export default appWithTranslation(MyApp)
