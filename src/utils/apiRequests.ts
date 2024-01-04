import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql'

export const getApiIntrospectionSchema = () => {
  return fetch('https://countries.trevorblades.com/graphql', {
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
