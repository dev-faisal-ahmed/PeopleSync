import { MainLayout } from '@/components/layout/main-layout';
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
      { path: '/', element: <HomePage /> },
      { path: '/jobs', element: <JobPage /> },
      { path: '/add-job', element: <AddJobPage /> },
      { path: '/apply', element: <ApplyJobPage /> },
      { path: '/applications', element: <ApplicationPage /> },
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
