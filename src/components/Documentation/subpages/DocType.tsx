import { type GraphQLNamedType } from 'graphql'
import { isFieldsContained } from '../utils'
import useDocumentationLocale from '../utils/hooks/useDocumentationLocale'
import { DocLayout, DocName, DocSection } from './@parts/DocLayout'
import { DocLink } from './@parts/DocLink'

export default function DocType(props: { type: GraphQLNamedType }) {
  const { type } = props
  const doc = useDocumentationLocale()
  return (
    <DocLayout>
      <DocName>{type.name}</DocName>
      <DocSection markdown heading={doc.typography.heading.description}>
        {type.description}
      </DocSection>
      <DocSection heading={doc.typography.heading.fields}>
        {(isFieldsContained(type) ? Object.values(type.getFields()) : []).map(
          (field) => (
            <DocLink key={field.name} type={field} />
          ),
        )}
      </DocSection>
      {/* Sorry, not supported yet... */}
      <DocSection heading={doc.typography.heading.interfaces} />
      <DocSection heading={doc.typography.heading.enum} />
    </DocLayout>
  )
}
