import { Provider } from 'next-auth/client';
import '@styles/index.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import Layout from '@components/layout/Layout';
import { DataProvider } from 'context/GlobalState';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Provider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
