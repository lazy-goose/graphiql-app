import { type Region } from '@/constants'

export type Locale = {
  header: {
    button: {
      refetch: string
      signIn: string
      signUp: string
      signOut: string
      explorer: string
    }
    inputLabel: string
  }
  signInUpPage: {
    typography: {
      heading: {
        signIn: string
        signUp: string
      }
      question: {
        signIn: string
        signUp: string
      }
      passwordStrength: {
        description: string
        tooWeak: string
        weak: string
        fair: string
        good: string
        strong: string
      }
    }
    button: {
      submit: string
    }
    inputLabel: {
      email: string
      password: string
      confirmPassword: string
    }
    link: {
      signIn: string
      signUp: string
    }
    error: {
      email: {
        length: string
        validation: string
      }
      password: {
        length: string
        characters: string[]
        uppercase: string[]
        lowercase: string[]
        digit: string[]
        specialCharacter: string[]
      }
      confirmPassword: {
        length: string
        matching: string
      }
    }
  }
  mainPage: {
    button: {
      openDocs: string
      addHeader: string
      prettify: string
      run: string
    }
    tab: {
      request: string
      response: string
      variables: string
      headers: string
    }
    inputLabel: {
      headerKey: string
      headerValue: string
    }
    codeEditor: string
  }
  welcomePage: {
    typography: {
      heading: {
        functional: { part1: string; part2: string }
        sponsor: string
        team: string
        wishes: string
      }
      text: {
        sponsor: { part1: string; part2: string; part3: string; part4: string }
        team: {
          teammate1: {
            name: string
            roleList: string[]
          }
          teammate2: {
            name: string
            roleList: string[]
          }
          teammate3: {
            name: string
            roleList: string[]
          }
        }
        wishes: string
      }
    }
  }
  errorBoundary: {
    typography: string
    button: {
      reload: string
    }
  }
}

export type LocaleWithMeta = Locale & {
  meta: {
    code: Region
    name: string
  }
}
