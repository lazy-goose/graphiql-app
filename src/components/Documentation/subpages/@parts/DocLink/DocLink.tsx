import { isFieldType } from '@/components/Documentation/utils'
import { useBoundStore } from '@/store'
import { type GraphQLArgument, type GraphQLField } from 'graphql'
import { unwrapOfType } from '../../../utils/unwrapOfType'
import ComboLink from './ComboLink'

export default function DocLink(props: {
  type: GraphQLArgument | GraphQLField<unknown, unknown>
}) {
  const { type } = props
  const pushDocNavStack = useBoundStore((state) => state.pushDocNavStack)
  return (
    <ComboLink
      name={type.name}
      type={type.type.toString()}
      args={(isFieldType(type) ? type.args : []).map(
        ({ name, defaultValue, type }) => ({
          name,
          type: type.toString(),
          defaultValue: JSON.stringify(defaultValue),
        }),
      )}
      hover="name"
      del={Boolean(type.deprecationReason)}
      action={() => {
        pushDocNavStack({ name: type.name, def: unwrapOfType(type) })
      }}
      description={type.description || ''}
      deprecationReason={type.deprecationReason || ''}
    />
  )
}
