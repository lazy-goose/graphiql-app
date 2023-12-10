import { HttpResponse, graphql, http } from 'msw'

const jsonPlaceHolder = graphql.link('https://jsonplaceholder.ir/graphql')

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json(['Empty'], { status: 200 })
  }),
  jsonPlaceHolder.query('posts', () => {
    return HttpResponse.json({ data: ['Empty'] })
  }),
]
