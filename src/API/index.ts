import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql'

export const getApiIntrospectionSchema = (baseUrl: string) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then((res) => res.json())
    .then((result) => {
      const clientSchema = buildClientSchema(result.data)
      return printSchema(clientSchema)
    })
}

export const getApiResponse = (
  baseUrl: string,
  schema: string,
  headers: Record<string, string>,
  variables: string,
) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: schema,
      variables: JSON.parse(variables),
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return JSON.stringify(result.data, null, 2)
    })
}
