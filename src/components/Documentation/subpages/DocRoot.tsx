import { useBoundStore } from '@/store'
import useDocumentationLocale from '../utils/useDocumentationLocale'
import { DocLayout, DocSection } from './@parts/DocLayout'
import { ComboLink } from './@parts/DocLink'

export default function DocRoot() {
  const schema = useBoundStore((state) => state.schema)
  const pushDocNavStack = useBoundStore((state) => state.pushDocNavStack)
  const doc = useDocumentationLocale()

  if (!schema) return null

  const rootTypes = [
    schema.getQueryType(),
    schema.getMutationType(),
    schema.getSubscriptionType(),
  ]

  return (
    <DocLayout>
      <DocSection heading={doc.typography.heading.root}>
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
