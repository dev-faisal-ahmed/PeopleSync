import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/(auth)/login'));
const HomePage = lazy(() => import('@/pages/(main)/home'));
const JobPage = lazy(() => import('@/pages/(main)/jobs'));

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/jobs', element: <JobPage /> },
  { path: '/login', element: <LoginPage /> },
]);

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen items-center justify-center bg-gray-500/50'>
          Loading.....
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
