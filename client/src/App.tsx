import { Provider } from 'react-redux';
import { AppRouter } from './router/router';
import { store } from './redux/store';
import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <main className='text-sm'>
        <Provider store={store}>
          <AppRouter />
          <Toaster richColors />
        </Provider>
      </main>
    </>
  );
}
