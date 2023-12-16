export type IErrorBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

export type IErrorBoundaryState = {
  hasError: boolean
}
