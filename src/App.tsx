import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

export function App(): React.ReactElement {
  return <RouterProvider router={router} />
}
