import { Provider } from 'react-redux';
import { AppRouter } from './router/router';
import { store } from './redux/store';

export function App() {
  return (
    <>
      <main className='text-sm'>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </main>
    </>
  );
}
