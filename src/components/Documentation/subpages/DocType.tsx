import { type GraphQLNamedType } from 'graphql'
import { isFieldsContained } from '../utils'
import { DocLayout, DocName, DocSection } from './@parts/DocLayout'
import { DocLink } from './@parts/DocLink'

export default function DocType(props: { type: GraphQLNamedType }) {
  const { type } = props
  return (
    <DocLayout>
      <DocName>{type.name}</DocName>
      <DocSection markdown heading="Description">
        {type.description}
      </DocSection>
      <DocSection heading="Fields">
        {(isFieldsContained(type) ? Object.values(type.getFields()) : []).map(
          (field) => (
            <DocLink key={field.name} type={field} />
          ),
        )}
      </DocSection>
      {/* Sorry, not supported yet... */}
      <DocSection heading="Interfaces" />
      <DocSection heading="Enum Values" />
    </DocLayout>
  )
}
