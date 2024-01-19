import { DocLayout, DocSection } from './@parts/DocLayout'

export default function DocError(props: { message: string | undefined }) {
  const { message } = props
  return (
    <DocLayout>
      <DocSection markdown heading="Error">
        {message}
      </DocSection>
    </DocLayout>
  )
}
