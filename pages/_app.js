import { Provider } from 'next-auth/client';
import '@styles/index.css';
import Navbar from '@components/layout/Navbar';
import Layout from '@components/layout/Layout';
import { DataProvider } from 'context/GlobalState';
import { QueryClient, QueryClientProvider } from 'react-query';
function MyApp({ Component, pageProps }) {
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
