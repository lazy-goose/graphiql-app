import { IErrorBoundaryProps, IErrorBoundaryState } from '@/types/types'
import { Component, ErrorInfo } from 'react'

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

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error)
    // eslint-disable-next-line no-console
    console.log(info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
