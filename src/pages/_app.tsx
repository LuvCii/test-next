import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'

import { SWRConfig } from "swr";
import instance from "@/api/instance";
import Layout from "@/components/Layouts";
import { AppPropsWithLayout } from "@/models/Layout";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? Layout;
  return <Provider store={store}>
      <LayoutWrapper>
            <SWRConfig value={{ fetcher: async (url) => await instance.get(url) }}>
                <Component {...pageProps} />
            </SWRConfig>
        </LayoutWrapper>
    </Provider>
}

export default MyApp
