import useDocumentationLocale from '../utils/useDocumentationLocale'
import { DocLayout, DocSection } from './@parts/DocLayout'

export default function DocError(props: { message: string | undefined }) {
  const { message } = props
  const doc = useDocumentationLocale()
  return (
    <DocLayout>
      <DocSection markdown heading={doc.typography.heading.error}>
        {message}
      </DocSection>
    </DocLayout>
  )
}
