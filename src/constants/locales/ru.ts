import { type Locale } from '@/types/locale'

const locale = {
  header: {
    button: {
      refetch: 'Получить',
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
      submit: 'отправить',
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
        length: 'Поле обязательно для заполнения',
        validation: 'Недопустимый адрес почты',
      },
      password: {
        length: 'Поле обязательно для заполнения',
        characters: ['Должен содержать 8 символов или больше', '8 символов'],
        uppercase: [
          'Должен содержать минимум одну заглавную букву',
          'одну заглавную букву',
        ],
        lowercase: [
          'Должен содержать минимум одну строчную букву',
          'одну строчную букву',
        ],
        digit: ['Должен содержать минимум одну цифру', 'одну цифру'],
        specialCharacter: [
          'Должен содержать минимум один спецсимвол: !@#$%^&*(),.?":{}|<>',
          'один спецсимвол',
        ],
      },
      confirmPassword: {
        length: 'Поле обязательно для заполнения',
        matching: 'Пароли не совпадают',
      },
    },
  },
  mainPage: {
    button: {
      openDocs: 'документация',
      addHeader: 'добавить заголовок',
      prettify: 'форматировать',
      run: 'запустить',
    },
    tab: {
      request: 'запрос',
      response: 'ответ',
      variables: 'переменные',
      headers: 'заголовки',
    },
    inputLabel: {
      headerKey: 'Название заголовка',
      headerValue: 'Значение',
    },
    codeEditor: `# Добро пожаловать в GraphiQL
    #
    # GraphiQL - это инструмент в браузере для написания, валидации и
    # тестирования GraphQL запросов.
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
    #`,
  },
  welcomePage: {
    typography: {
      heading: {
        functional: 'Полный функционал GraphQL приложения',
        sponsor: 'Вдохновитель',
        team: 'Наша команда',
        wishes: 'С Новым годом!',
      },
      text: {
        sponsor: {
          part1: 'RS School - это бесплатная образовательная программа,',
          part2: 'проводимая сообществом разработчиков с 2013 года.',
          part3:
            'Учиться в RS School может любой человек, независимо от возраста, профессионального занятия или места проживания.',
          part4:
            'Наставники и тренеры нашей школы - это фронтенд и JavaScript разработчики из различных компаний и стран.',
        },
        team: {
          alyona: {
            name: 'Алёна Шупенёва',
            roleList: ['Аутентификация'],
          },
          alex: {
            name: 'Александр Коробейников',
            roleList: ['Организационные вопросы'],
          },
          maxim: {
            name: 'Максим Шамаль',
            roleList: ['Настройки проекта', 'Дизайн'],
          },
        },
        wishes: 'От всей души поздравляем Вас с Новым годом.',
      },
    },
  },
  errorBoundary: {
    typography: 'Что-то пошло не так',
    button: {
      reload: 'Перезагрузить',
    },
  },
}

export default locale satisfies Locale
