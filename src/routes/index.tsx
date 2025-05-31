import { Navigate, RouteObject } from 'react-router-dom';
import WelcomePage from '@/pages/welcome';
import BaseLayout from '@/layout/base-layout';
import AppPage from '@/pages/app';

export const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: '/app',
        element: <AppPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      }
    ]
  }
];