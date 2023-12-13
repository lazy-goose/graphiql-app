import { ErrorBoundary } from '@/components/ErrorBoudary'
import { ErrorPage } from '@/pages/ErrorPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SignInUpPage } from '@/pages/SignInUpPage'
import { WelcomePage } from '@/pages/WelcomePage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary fallback={<ErrorPage />}>
            <MainPage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'welcome',
        element: (
          <ErrorBoundary fallback={<ErrorPage />}>
            <WelcomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'sign-in-up',
        element: (
          <ErrorBoundary fallback={<ErrorPage />}>
            <SignInUpPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
])
