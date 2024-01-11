import { type LocaleWithMeta } from '@/types'
import en from './locales/en'
import ru from './locales/ru'

export enum RouterPath {
  Main = '/',
  Welcome = '/welcome',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
}

export const teammates = [
  {
    github: 'https://github.com/Alyona8891',
    cv: 'https://app.rs.school/cv/a6289dfe-179a-4fd6-8b9b-0fc5dc8f42cb',
    telegram: 'https://t.me/besssta',
    avatar: 'https://avatars.githubusercontent.com/u/79936182?v=4',
    active: false,
    id: 'teammate1',
  },
  {
    github: 'https://github.com/Lev1ossa',
    cv: 'https://app.rs.school/cv/c0d9798d-4db0-44d8-9af3-3087d6e25313',
    telegram: 'https://t.me/Lev1ossa',
    avatar: 'https://avatars.githubusercontent.com/u/104268412?v=4',
    active: false,
    id: 'teammate2',
  },
  {
    github: 'https://github.com/lazy-goose',
    cv: 'https://lazy-goose.github.io/rsschool-cv/',
    telegram: 'https://t.me/lazy_goose',
    avatar: 'https://avatars.githubusercontent.com/u/119844669?v=4',
    active: true,
    id: 'teammate3',
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
