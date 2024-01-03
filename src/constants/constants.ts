import { type LocaleWithMeta } from '@/types'
import en from './locales/en'
import ru from './locales/ru'

export const pathes = {
  mainPage: '/',
  welcomePage: '/welcome',
  signInUpPage: '/sign-in-up',
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
