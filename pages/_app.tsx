import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {appWithTranslation} from "next-i18next";
import {SnackbarProvider} from "notistack";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
import {ReactQueryDevtools} from "react-query/devtools";
import AppContext, {AppContextProps, UploadedImage} from "../src/app-context/app-context";
import {ImageStatus} from "../src/app-context/imageStatus";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    const [image, setImage] = useState<UploadedImage>({
        url: undefined,
        status: ImageStatus.DEFAULT,
        size: 0,
        name: undefined
    });
    const [stepper, setStepper] = useState(0);

    const CONTEXT_VALUE: AppContextProps = {
        state: {
            image: image,
            stepper: stepper
        },
        stateAction: {
            setImage: setImage,
            setStepper: setStepper
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
