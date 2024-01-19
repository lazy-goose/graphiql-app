import {
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
  isType,
  type GraphQLArgument,
  type GraphQLField,
  type GraphQLInterfaceType,
  type GraphQLNamedType,
  type GraphQLObjectType,
} from 'graphql'
import { z } from 'zod'
import { unwrapOfType, type RecursiveOfType } from './unwrapOfType'

const TypeSchema = z.object({
  type: z.custom<RecursiveOfType>((value) => isType(unwrapOfType(value))),
})

const ArgumentSchema = z
  .object({ defaultValue: z.unknown() })
  .merge(TypeSchema)
  .passthrough()

const FieldSchema = z
  .object({ args: z.array(ArgumentSchema) })
  .merge(TypeSchema)
  .passthrough()

export function isFieldType(
  value: unknown,
): value is GraphQLField<unknown, unknown> {
  return FieldSchema.safeParse(value).success
}

export function isArgumentType(value: unknown): value is GraphQLArgument {
  return ArgumentSchema.safeParse(value).success
}

export function isFieldsContained(
  value: unknown,
): value is GraphQLObjectType | GraphQLInterfaceType | GraphQLObjectType {
  return (
    isObjectType(value) || isInterfaceType(value) || isInputObjectType(value)
  )
}

export function isNameContained(
  value: unknown,
): value is
  | GraphQLNamedType
  | GraphQLField<unknown, unknown>
  | GraphQLArgument {
  return isNamedType(value) || isFieldType(value) || isArgumentType(value)
}
