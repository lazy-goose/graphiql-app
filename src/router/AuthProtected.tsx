import { RouterPath } from '@/constants'
import { useBoundStore } from '@/store'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthProtected(props: {
  redirectPath?: RouterPath
  whenUser?: boolean
  children?: React.ReactNode
}) {
  const { redirectPath = RouterPath.Welcome, whenUser = true, children } = props
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated())

  if (whenUser ? !isAuthenticated : isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
