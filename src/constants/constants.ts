import { type LocaleWithMeta } from '@/types'
import en from './locales/en'
import ru from './locales/ru'

export enum RouterPath {
  Main = '/',
  Welcome = '/welcome',
  SignInUp = '/sign-in-up',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
}

export const userAvatars = [
  {
    href: 'https://github.com/Alyona8891',
    imgSrc: 'https://avatars.githubusercontent.com/u/79936182?v=4',
    imgAlt: "Alyona's avatar",
    active: false,
  },
  {
    href: 'https://github.com/Lev1ossa',
    imgSrc: 'https://avatars.githubusercontent.com/u/104268412?v=4',
    imgAlt: "Alexandr's avatar",
    active: false,
  },
  {
    href: 'https://github.com/lazy-goose',
    imgSrc: 'https://avatars.githubusercontent.com/u/119844669?v=4',
    imgAlt: "Maksim's avatar",
    active: true,
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
