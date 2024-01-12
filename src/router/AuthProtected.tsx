import { RouterPath } from '@/constants'
import { useBoundStore } from '@/store'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthProtected(props: {
  redirectPath?: RouterPath
  whenUser?: boolean
  children?: React.ReactNode
}) {
  const { redirectPath = RouterPath.Welcome, whenUser = true, children } = props
  const user = useBoundStore((state) => state.user)
  const isUser = Boolean(user)

  if (whenUser ? !isUser : isUser) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
