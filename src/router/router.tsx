import { ErrorBoundary } from '@/components/ErrorBoudary'
import { RouterPath } from '@/constants/constants'
import { SignInPage } from '@/pages/@SignPages/SignInPage'
import { SignUpPage } from '@/pages/@SignPages/SignUpPage'
import { ErrorPage } from '@/pages/ErrorPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { WelcomePage } from '@/pages/WelcomePage'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />} path="">
      <Route
        path={RouterPath.Main}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <MainPage />
          </ErrorBoundary>
        }
      />
      <Route
        path={RouterPath.Welcome}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <WelcomePage />
          </ErrorBoundary>
        }
      />
      <Route
        path={RouterPath.SignIn}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <SignInPage />
          </ErrorBoundary>
        }
      />
      <Route
        path={RouterPath.SignUp}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <SignUpPage />
          </ErrorBoundary>
        }
      />
    </Route>,
  ),
)
