import { ErrorBoundary } from '@/components/ErrorBoudary'
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
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'welcome',
        element: (
          <ErrorBoundary>
            <WelcomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'sign-in-up',
        element: (
          <ErrorBoundary>
            <SignInUpPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
])
