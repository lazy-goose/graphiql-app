import { type GraphQLType } from 'graphql'

export interface RecursiveOfType {
  ofType: GraphQLType | RecursiveOfType
}

function isRecord(unknown: unknown): unknown is Record<string, unknown> {
  return typeof unknown === 'object' && unknown !== null
}
const hasOfTypeProperty = (value: unknown): value is RecursiveOfType => {
  return isRecord(value) && Object.hasOwn(value, 'ofType')
}

export function unwrapOfType<T>(type: T): T | GraphQLType {
  if (!hasOfTypeProperty(type)) {
    return type
  }
  return unwrapOfType(type.ofType) as never
}
