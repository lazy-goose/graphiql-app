import { EditorView } from '@uiw/react-codemirror'

import '@fontsource/source-code-pro'

export const useBaseTheme = (
  params: {
    autoHideLintGutter?: boolean
  } = {},
) => {
  const { autoHideLintGutter = false } = params

  const colors = {
    gutter: '#a0a0a0',
    background: '#ffffff',
    fold: '#0286fe',
    selection: '#2196f322',
    default: '#232327',
  }

  return EditorView.theme({
    '&': {
      height: '100%',
      color: colors.default,
      fontSize: '1rem',
      fontFamily: 'Source Code Pro, sans-serif',
    },
    '&.cm-focused': {
      outlineColor: 'transparent !important',
    },
    '.cm-selectionBackground': {
      background: colors.selection + ' !important',
    },
    '.cm-gutters': {
      color: colors.gutter,
      border: 'none',
      background: colors.background,
    },
    '.cm-line': {
      paddingLeft: '15px',
    },
    '.cm-foldPlaceholder': {
      color: colors.fold,
      border: 'none',
      background: 'none',
    },
    '.cm-lint-marker': {
      width: '0.8em',
      height: '0.8em',
      margin: '0.1em',
    },
    ...(autoHideLintGutter && {
      '.cm-gutter-lint:not(:has(.cm-lint-marker))': {
        display: 'none !important',
      },
    }),
  })
}
