export type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

export type ErrorBoundaryState = {
  hasError: boolean
}
