import { MainLayout } from '@/components/layout/main-layout';
import { ProtectedWrapper } from '@/components/shared/projected-wrapper';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/(auth)/login'));
const HomePage = lazy(() => import('@/pages/(main)/home'));
const JobPage = lazy(() => import('@/pages/(main)/jobs'));
const NotFoundPage = lazy(() => import('@/pages/not-found/not-found'));
const AddJobPage = lazy(() => import('@/pages/(main)/add-job'));
const ApplyJobPage = lazy(() => import('@/pages/(main)/apply-job'));
const ApplicationPage = lazy(() => import('@/pages/(main)/application'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedWrapper>
            <HomePage />
          </ProtectedWrapper>
        ),
      },
      {
        path: '/jobs',
        element: (
          <ProtectedWrapper>
            <JobPage />
          </ProtectedWrapper>
        ),
      },
      {
        path: '/add-job',
        element: (
          <ProtectedWrapper>
            <AddJobPage />
          </ProtectedWrapper>
        ),
      },
      { path: '/apply', element: <ApplyJobPage /> },
      {
        path: '/applications',
        element: (
          <ProtectedWrapper>
            <ApplicationPage />
          </ProtectedWrapper>
        ),
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
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
