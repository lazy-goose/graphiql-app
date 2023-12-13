import { ErrorBoundary } from '@/components/ErrorBoudary'
import { pathes } from '@/constants/constants'
import { ErrorPage } from '@/pages/ErrorPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SignInUpPage } from '@/pages/SignInUpPage'
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
        path={pathes.mainPage}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <MainPage />
          </ErrorBoundary>
        }
      />
      <Route
        path={pathes.welcomePage}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <WelcomePage />
          </ErrorBoundary>
        }
      />
      <Route
        path={pathes.signInUpPage}
        element={
          <ErrorBoundary fallback={<ErrorPage />}>
            <SignInUpPage />
          </ErrorBoundary>
        }
      />
    </Route>,
  ),
)
