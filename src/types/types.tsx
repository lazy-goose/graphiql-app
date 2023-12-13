export interface IErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

export interface IErrorBoundaryState {
  hasError: boolean
}
