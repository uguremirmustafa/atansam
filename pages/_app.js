import { Provider } from 'next-auth/client';
import '@styles/index.css';
import Navbar from '@components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
