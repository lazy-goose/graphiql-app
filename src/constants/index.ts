import { type Locale, type LocaleWithMeta } from '@/types'
import en from './locales/en'
import ru from './locales/ru'

export enum RouterPath {
  Main = '/',
  Welcome = '/welcome',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
}

export const teammates = ({
  welcomePage: {
    typography: {
      text: { team },
    },
  },
}: Locale) =>
  [
    {
      github: 'https://github.com/Alyona8891',
      cv: 'https://app.rs.school/cv/a6289dfe-179a-4fd6-8b9b-0fc5dc8f42cb',
      telegram: 'https://t.me/besssta',
      avatar: 'https://avatars.githubusercontent.com/u/79936182?v=4',
      active: false,
      id: 'teammate1',
      name: team.teammate1.name,
      tasks: team.teammate1.tasks.map((name) => ({ name, del: true })),
    },
    {
      github: 'https://github.com/Lev1ossa',
      cv: 'https://app.rs.school/cv/c0d9798d-4db0-44d8-9af3-3087d6e25313',
      telegram: 'https://t.me/Lev1ossa',
      avatar: 'https://avatars.githubusercontent.com/u/104268412?v=4',
      active: false,
      id: 'teammate2',
      name: team.teammate2.name,
      tasks: team.teammate2.tasks.map((name, i) => ({
        name,
        del: [0].includes(i) ? false : true,
      })),
    },
    {
      github: 'https://github.com/lazy-goose',
      cv: 'https://lazy-goose.github.io/rsschool-cv/',
      telegram: 'https://t.me/lazy_goose',
      avatar: 'https://avatars.githubusercontent.com/u/119844669?v=4',
      active: true,
      id: 'teammate3',
      name: team.teammate3.name,
      tasks: team.teammate3.tasks.map((name) => ({ name, del: false })),
    },
  ] as const

export enum Region {
  EN = 'en',
  RU = 'ru',
}

export const Locales = {
  [Region.EN]: {
    meta: {
      code: Region.EN,
      name: 'English',
    },
    ...en,
  },
  [Region.RU]: {
    meta: {
      code: Region.RU,
      name: 'Русский',
    },
    ...ru,
  },
} as {
  [key in Region]: LocaleWithMeta
}

export const PredefinedHeaders = [
  'WWW-Authenticate',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Keep-Alive',
  'Access-Control-Allow-Origin',
  'Access-Control-Allow-Credentials',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Methods',
  'Access-Control-Expose-Headers',
  'Access-Control-Max-Age',
  'Access-Control-Request-Headers',
  'Access-Control-Request-Method',
]

export * from './statusText'
