import { buildClientSchema, getIntrospectionQuery } from 'graphql'

export const getApiIntrospectionSchema = (
  baseUrl: string,
  headers: Record<string, string>,
) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then((res) => res.json())
    .then((result) => {
      return buildClientSchema(result.data)
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
