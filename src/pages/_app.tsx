import '../styles/globals.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '../store';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
