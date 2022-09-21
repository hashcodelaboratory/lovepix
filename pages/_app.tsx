import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {appWithTranslation} from "next-i18next";
import {SnackbarProvider} from "notistack";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
import {ReactQueryDevtools} from "react-query/devtools";
import AppContext, {UploadedImage} from "../src/app-context/app-context";
import {ImageStatus} from "../src/app-context/imageStatus";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    const [imageUrl, setImageUrl] = useState<string | undefined>('data:image/jpeg;base64,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');
    const [imageStatus, setImageStatus] = useState<ImageStatus>(ImageStatus.CONFIGURED);
    const [image] = useState<UploadedImage>({
        url: imageUrl,
        status: imageStatus,
        size: imageUrl && imageStatus === ImageStatus.CONFIGURED ? 1 : 0
    });

    const CONTEXT_VALUE = {
        state: {
            image: image
        },
        stateAction: {
            setImageUrl: setImageUrl,
            setImageStatus: setImageStatus
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
