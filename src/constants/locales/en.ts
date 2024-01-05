import { type Locale } from '@/types/locale'

const locale = {
  header: {
    button: {
      refetch: 'refetch',
      signIn: 'sign in',
      signUp: 'sign up',
      signOut: 'sign out',
      explorer: 'explorer',
    },
    inputLabel: 'Endpoint',
  },
  signInUpPage: {
    typography: {
      heading: {
        signIn: 'Sign in',
        signUp: 'Sign up',
      },
      question: {
        signIn: 'Create a new account?',
        signUp: 'Already have an account?',
      },
      passwordStrenth: {
        description: 'Strong password contains at least',
        tooWeak: 'Too Weak',
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
      },
    },
    button: {
      submit: 'submit',
    },
    inputLabel: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    },
    link: {
      signIn: 'Sign in',
      signUp: 'Sign up',
    },
    error: {
      email: {
        length: 'Email is required',
        validation: 'Must be a valid email',
      },
      password: {
        length: 'Password is required',
        characters: ['Must be at least 8 characters or more', '8 characters'],
        uppercase: [
          'Should have at least one Uppercase letter',
          'uppercase letter',
        ],
        lowercase: [
          'Should have at least one Lowercase letter',
          'lowercase letter',
        ],
        digit: ['Should have at least one digit', 'one digit'],
        specialCharacter: [
          'Should have at least one special character: !@#$%^&*(),.?":{}|<>',
          'one special character',
        ],
      },
      confirmPassword: {
        length: 'Password confirm is required',
        matching: 'Passwords do not match',
      },
    },
  },
  mainPage: {
    button: {
      openDocs: '',
      addHeader: 'add header',
      prettify: 'prettify',
      run: 'run',
    },
    tab: {
      request: 'request',
      response: 'response',
      variables: 'variables',
      headers: 'headers',
    },
    inputLabel: {
      headerKey: 'Header key',
      headerValue: 'Value',
    },
    codeEditor: `# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
# 
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and 
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that starts
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
`,
  },
  welcomePage: {
    typography: {
      heading: {
        functional: 'Fully functional GraphQL explorer',
        sponsor: 'Sponsor',
        team: 'Our team',
        wishes: 'Wishes a Happy New Year!',
      },
      text: {
        sponsor: {
          part1:
            'RS School is free-of-charge and community-based education program conducted by',
          part2: 'developer communitysince 2013.',
          part3:
            'Everyone can study at RS School, regardless of age, professional employment, or place of residence.',
          part4:
            'The mentors and trainers of our school are front-end and javascript developers from different companies and countries.',
        },
        team: {
          alyona: {
            name: 'Alena Shupianiova',
            roleList: ['Authentication'],
          },
          alex: {
            name: 'Aleksandr Korobeinikov',
            roleList: ['Organizational matters'],
          },
          maxim: {
            name: 'Maksim Shamal',
            roleList: ['Project setup', 'Design'],
          },
        },
        wishes: 'We sincerely congratulate you on the upcoming New Year.',
      },
    },
  },
  errorBoundary: {
    typography: 'Something went wrong',
    button: {
      reload: 'reload page',
    },
  },
}

export default locale satisfies Locale
