import { type Locale } from '@/types/locale'

const locale = {
  header: {
    button: {
      refetch: 'Загрузить',
      signIn: 'Войти',
      signUp: 'Регистрация',
      signOut: 'Выйти',
      explorer: 'Начать',
    },
    inputLabel: 'Адрес',
  },
  signInUpPage: {
    typography: {
      heading: {
        signIn: 'Вход',
        signUp: 'Регистрация',
      },
      question: {
        signIn: 'Еще не зарегистрированы?',
        signUp: 'Уже зарегистрированы?',
      },
      passwordStrength: {
        description: 'Сильный пароль должен содержать',
        tooWeak: 'Очень слабый',
        weak: 'Слабый',
        fair: 'Нормальный',
        good: 'Хороший',
        strong: 'Сильный',
      },
    },
    button: {
      submit: 'Отправить',
    },
    inputLabel: {
      email: 'Почта',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
    },
    link: {
      signIn: 'Вход',
      signUp: 'Регистрация',
    },
    error: {
      email: {
        required: 'Поле обязательно для заполнения',
        validation: 'Недопустимый адрес почты',
      },
      password: {
        required: 'Поле обязательно для заполнения',
        minLength: {
          long: 'Должен содержать 8 символов или больше',
          short: '8 символов',
        },
        uppercase: {
          long: 'Должен содержать минимум одну заглавную букву',
          short: 'одну заглавную букву',
        },
        lowercase: {
          long: 'Должен содержать минимум одну строчную букву',
          short: 'одну строчную букву',
        },
        digit: {
          long: 'Должен содержать минимум одну цифру',
          short: 'одну цифру',
        },
        specialCharacter: {
          long: 'Должен содержать минимум один спецсимвол: !@#$%^&*(),.?":{}|<>',
          short: 'один спецсимвол',
        },
      },
      confirmPassword: {
        required: 'Поле обязательно для заполнения',
        matching: 'Пароли не совпадают',
      },
    },
  },
  mainPage: {
    button: {
      openDocs: 'Документация',
      addHeader: 'Добавить',
      prettify: 'Форматировать',
      run: 'Запустить',
    },
    tab: {
      request: 'Запрос',
      response: 'Ответ',
      variables: 'Переменные',
      headers: 'Заголовки',
    },
    inputLabel: {
      headerKey: 'Название заголовка',
      headerValue: 'Значение',
    },
    error: {
      prettify: 'Не удалось отформатировать запрос',
    },
    codeEditor: `# Добро пожаловать в GraphiQL
#
# GraphiQL - это инструмент в браузере для написания, валидации и
# тестирования GraphQtasks запросов.
#
# Введите запросы на этой стороне экрана, и вы увидите умные подсказки,
# указывающие на текущую схему типов GraphQL, а также выделенные в тексте
# синтаксические ошибки и ошибки валидации.
#
# GraphQL запросы обычно начинаются с символа "{". Строки, которые начинаются
# с символа #, игнорируются.
#
# GraphQL запрос должен выглядеть так:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
`,
    documentation: {
      typography: {
        heading: {
          main: 'Документация',
          error: 'Ошибка',
          root: 'Корневые типы',
          description: 'Описание',
          deprecation: 'Устаревшее',
          arguments: 'Аргументы',
          fields: 'Поля',
          scalar: {
            part: '- описание типа',
          },
          enum: 'Перечисляемые типы (Enum)',
          interfaces: 'Интерфейсы',
        },
        body: {
          notSupported: 'Неподдерживаемый тип',
        },
        chip: {
          autotranslate: 'Автоперевод',
        },
      },
    },
  },
  welcomePage: {
    typography: {
      heading: {
        functional: {
          part1: 'Полный функционал',
          part2: 'GraphQL приложения',
        },
        sponsor: 'Спонсоры',
        team: 'Наша команда',
        wishes: 'С Новым годом!',
      },
      text: {
        functional: {
          part1:
            'GraphiQL - это инструмент в браузере для написания, валидации и тестирования GraphQL запросов.',
          part2:
            'Введите запросы на левой стороне экрана, и вы увидите умные подсказки, указывающие на текущую схему типов GraphQL, а также выделенные в тексте синтаксические ошибки и ошибки валидации.',
        },
        sponsor: {
          part1: '- это бесплатная образовательная программа,',
          part2: 'проводимая сообществом разработчиков с 2013 года.',
          part3:
            'Учиться в RS School может любой человек, независимо от возраста, профессионального занятия или места проживания.',
          part4:
            'Наставники и тренеры нашей школы - это фронтенд и JavaScript разработчики из различных компаний и стран.',
        },
        team: {
          teammate1: {
            name: 'Алёна Шупенёва',
            tasks: ['Аутентификация', 'Страница приветствия'],
          },
          teammate2: {
            name: 'Александр Коробейников',
            tasks: ['Организационные вопросы', 'API-запросы'],
          },
          teammate3: {
            name: 'Максим Шамаль',
            tasks: [
              'Настройки проекта',
              'Дизайн',
              'Логика приложения',
              'Отображение страниц',
            ],
          },
        },
        wishes: 'От всей души поздравляем Вас с Новым годом.',
      },
    },
    tooltip: {
      refactoredBy: 'Переработано гусём',
    },
  },
  errorBoundary: {
    typography: 'Что-то пошло не так',
    button: {
      reload: 'Перезагрузить',
    },
  },
  notFound: {
    typography: {
      heading: 'Без понятия где вы оказались?',
      body: 'Да мы как-то тоже...',
    },
    button: {
      welcomePage: 'Страница приветствия',
    },
  },
}

export default locale satisfies Locale
