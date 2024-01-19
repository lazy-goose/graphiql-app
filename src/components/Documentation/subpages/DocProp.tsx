import { isScalarType, type GraphQLArgument, type GraphQLField } from 'graphql'
import { isFieldType, isFieldsContained, unwrapOfType } from '../utils'
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

  if (isScalarType(constructorType)) {
    const scalarType = constructorType
    return (
      <DocLayout>
        <DocName>
          {propType.name}
          {': '}
          {scalarType.toString()}
        </DocName>
        <DocSection markdown heading={`${scalarType.name} type Metadata`}>
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
      <DocSection markdown heading="Description">
        {propType.description}
      </DocSection>
      <DocSection markdown heading="Deprecation reason">
        {propType.deprecationReason}
      </DocSection>
      <DocSection heading="Arguments">
        {(isFieldType(propType) ? propType.args : []).map((arg) => (
          <DocLink key={arg.name} type={arg} />
        ))}
      </DocSection>
      <DocSection heading="Fields">
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
