import { useBoundStore } from '@/store'
import { DocLayout, DocSection } from './@parts/DocLayout'
import { ComboLink } from './@parts/DocLink'

export default function DocRoot() {
  const schema = useBoundStore((state) => state.schema)
  const pushDocNavStack = useBoundStore((state) => state.pushDocNavStack)

  if (!schema) return null

  const rootTypes = [
    schema.getQueryType(),
    schema.getMutationType(),
    schema.getSubscriptionType(),
  ]

  return (
    <DocLayout>
      <DocSection heading="Root Types">
        {rootTypes.map((type) => {
          if (type) {
            const name = type.name.toLowerCase()
            const typeName = type.toString()
            return (
              <ComboLink
                key={name}
                name={name}
                type={typeName}
                hover="type"
                action={() => {
                  pushDocNavStack({ name: typeName, def: type })
                }}
              />
            )
          }
        })}
      </DocSection>
    </DocLayout>
  )
}
