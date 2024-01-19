const locale = {
  header: {
    button: {
      refetch: 'Refetch',
      signIn: 'Sign in',
      signUp: 'Sign up',
      signOut: 'Sign out',
      explorer: 'Explorer',
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
      passwordStrength: {
        description: 'Strong password contains at least',
        tooWeak: 'Too Weak',
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
      },
    },
    button: {
      submit: 'Submit',
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
        required: 'Email is required',
        validation: 'Must be a valid email',
      },
      password: {
        required: 'Password is required',
        minLength: {
          long: 'Must be at least 8 characters or more',
          short: '8 characters',
        },
        uppercase: {
          long: 'Should have at least one Uppercase letter',
          short: 'uppercase letter',
        },
        lowercase: {
          long: 'Should have at least one Lowercase letter',
          short: 'lowercase letter',
        },
        digit: {
          long: 'Should have at least one digit',
          short: 'one digit',
        },
        specialCharacter: {
          long: 'Should have at least one special character: !@#$%^&*(),.?":{}|<>',
          short: 'one special character',
        },
      },
      confirmPassword: {
        required: 'Password confirm is required',
        matching: 'Passwords do not match',
      },
    },
  },
  mainPage: {
    button: {
      openDocs: 'Documentation',
      addHeader: 'Add header',
      prettify: 'Prettify',
      run: 'Run',
    },
    tab: {
      request: 'Request',
      response: 'Response',
      variables: 'Variables',
      headers: 'Headers',
    },
    inputLabel: {
      headerKey: 'Header key',
      headerValue: 'Value',
    },
    error: {
      prettify: 'Unable to prettify the query',
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
    documentation: {
      typography: {
        heading: {
          main: 'Documentation',
          error: 'Error',
          root: 'Root Types',
          description: 'Description',
          deprecation: 'Deprecation reason',
          arguments: 'Arguments',
          fields: 'Fields',
          scalar: {
            part: 'type Metadata',
          },
          enum: 'Enum Values',
          interfaces: 'Interfaces',
        },
        body: {
          notSupported: 'Unsupported Type',
        },
      },
    },
  },
  welcomePage: {
    typography: {
      heading: {
        functional: { part1: 'Fully functional', part2: 'GraphQL explorer' },
        sponsor: 'Sponsor',
        team: 'Our team',
        wishes: 'Wishes a Happy New Year!',
      },
      text: {
        functional: {
          part1:
            'GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.',
          part2:
            'Type queries into left side of the screen, and you will see intelligent typeaheads aware of the current GraphQL type schema and live syntax and validation errors highlighted within the text',
        },
        sponsor: {
          part1:
            'Is free-of-charge and community-based education program conducted by',
          part2: 'developer community since 2013.',
          part3:
            'Everyone can study at RS School, regardless of age, professional employment, or place of residence.',
          part4:
            'The mentors and trainers of our school are front-end and javascript developers from different companies and countries.',
        },
        team: {
          teammate1: {
            name: 'Alena Shupianiova',
            tasks: ['Authentication', 'Welcome page'],
          },
          teammate2: {
            name: 'Aleksandr Korobeinikov',
            tasks: ['Organizational matters', 'API calls'],
          },
          teammate3: {
            name: 'Maksim Shamal',
            tasks: ['Project setup', 'Design', 'Main page'],
          },
        },
        wishes: 'We sincerely congratulate you on the upcoming New Year.',
      },
    },
  },
  errorBoundary: {
    typography: 'Something went wrong',
    button: {
      reload: 'Reload page',
    },
  },
  notFound: {
    typography: {
      heading: `Don't know where you\u00A0are?`,
      body: 'We really have no idea either...',
    },
    button: {
      welcomePage: 'Welcome Page',
    },
  },
}

export default locale
