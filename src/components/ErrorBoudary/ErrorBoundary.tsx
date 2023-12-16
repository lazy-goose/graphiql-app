import { Component, type ErrorInfo } from 'react'
import {
  type IErrorBoundaryProps,
  type IErrorBoundaryState,
} from './ErrorBoundary.types'

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState,
  string
> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
