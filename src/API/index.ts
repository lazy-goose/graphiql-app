import { buildClientSchema, getIntrospectionQuery } from 'graphql'

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
      return clientSchema
    })
}

// TODO change api url from default to user input
export const getApiResponse = (
  schema: string,
  headers: Record<string, string>,
  variables?: Record<string, string>,
) => {
  return fetch('https://countries.trevorblades.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: schema,
      variables,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result.data
    })
}

// TODO remove all examples
// const ExampleSchema = `
//   query countries($filter: CountryFilterInput) {
//     countries(filter: $filter) {
//       __typename
//       code
//       name
//       native
//       phone
//       capital
//       currency
//       emoji
//       emojiU
//     }
//   }
// `;

// const exampleHeaders =  {
//   'Content-Type': 'application/json',
// };
