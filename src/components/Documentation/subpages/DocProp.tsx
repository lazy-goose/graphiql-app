import { isScalarType, type GraphQLArgument, type GraphQLField } from 'graphql'
import { isFieldType, isFieldsContained, unwrapOfType } from '../utils'
import useDocumentationLocale from '../utils/useDocumentationLocale'
import { DocLayout, DocName, DocSection } from './@parts/DocLayout'
import { DocLink } from './@parts/DocLink'

const LineThrough = (props: React.PropsWithChildren<{ del: boolean }>) => {
  const { del, children } = props
  return del ? <del>{children}</del> : children
}

export default function DocProp(props: {
  type: GraphQLArgument | GraphQLField<unknown, unknown>
}) {
  const { type: propType } = props
  const constructorType = unwrapOfType(propType.type)
  const doc = useDocumentationLocale()

  if (isScalarType(constructorType)) {
    const scalarType = constructorType
    return (
      <DocLayout>
        <DocName>
          {propType.name}
          {': '}
          {scalarType.toString()}
        </DocName>
        <DocSection
          markdown
          heading={`${scalarType.name} ${doc.typography.heading.scalar.part}`}
        >
          {scalarType.description}
        </DocSection>
      </DocLayout>
    )
  }

  return (
    <DocLayout>
      <DocName>
        <LineThrough del={Boolean(propType.deprecationReason)}>
          {propType.name}: {constructorType.toString()}
        </LineThrough>
      </DocName>
      <DocSection markdown heading={doc.typography.heading.description}>
        {propType.description}
      </DocSection>
      <DocSection markdown heading={doc.typography.heading.deprecation}>
        {propType.deprecationReason}
      </DocSection>
      <DocSection heading={doc.typography.heading.arguments}>
        {(isFieldType(propType) ? propType.args : []).map((arg) => (
          <DocLink key={arg.name} type={arg} />
        ))}
      </DocSection>
      <DocSection heading={doc.typography.heading.fields}>
        {(isFieldsContained(constructorType)
          ? Object.values(constructorType.getFields())
          : []
        ).map((field) => (
          <DocLink key={field.name} type={field} />
        ))}
      </DocSection>
    </DocLayout>
  )
}
