import { ErrorBoundaryWrapper } from '@/components/@Error/ErrorBoundaryWrapper'
import { Header } from '@/components/Header'
import { RouterPath } from '@/constants'
import { SignInPage } from '@/pages/@SignPages/SignInPage'
import SignPagesHeader from '@/pages/@SignPages/SignPagesHeader'
import { SignUpPage } from '@/pages/@SignPages/SignUpPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { WelcomePage } from '@/pages/WelcomePage'
import WelcomePageHeader from '@/pages/WelcomePage/WelcomePageHeader'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import AuthProtected from './AuthProtected'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />} path="">
      <Route element={<AuthProtected redirectPath={RouterPath.Welcome} />}>
        <Route
          path={RouterPath.Main}
          element={
            <ErrorBoundaryWrapper errorHeaderSlot={<Header />}>
              <MainPage />
            </ErrorBoundaryWrapper>
          }
        />
      </Route>
      <Route
        path={RouterPath.Welcome}
        element={
          <ErrorBoundaryWrapper errorHeaderSlot={<WelcomePageHeader />}>
            <WelcomePage />
          </ErrorBoundaryWrapper>
        }
      />
      <Route
        element={
          <AuthProtected whenUser={false} redirectPath={RouterPath.Main} />
        }
      >
        <Route
          path={RouterPath.SignIn}
          element={
            <ErrorBoundaryWrapper errorHeaderSlot={<SignPagesHeader />}>
              <SignInPage />
            </ErrorBoundaryWrapper>
          }
        />
        <Route
          path={RouterPath.SignUp}
          element={
            <ErrorBoundaryWrapper errorHeaderSlot={<SignPagesHeader />}>
              <SignUpPage />
            </ErrorBoundaryWrapper>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
)
