import { useBoundStore, type DocNavStackItem } from '@/store'
import mergeSx from '@/utils/mergeSx'
import { West } from '@mui/icons-material'
import {
  Breadcrumbs,
  Button,
  IconButton,
  Stack,
  Typography,
  type ButtonProps,
} from '@mui/material'
import { isNamedType } from 'graphql'
import { Loader } from '../Loader'
import DocError from './subpages/DocError'
import DocProp from './subpages/DocProp'
import DocRoot from './subpages/DocRoot'
import DocType from './subpages/DocType'
import { isArgumentType, isFieldType } from './utils'
import useDocumentationLocale from './utils/hooks/useDocumentationLocale'

const DocNavLink = (props: { isActive: boolean } & ButtonProps) => {
  const { isActive, sx, ...ButtonProps } = props
  return (
    <Button
      disableRipple
      sx={mergeSx(sx, (theme) => ({
        textTransform: 'unset',
        fontWeight: 'regular',
        color: theme.palette.text.secondary,
        ...(isActive && {
          color: theme.palette.tertiary.main,
          pointerEvents: 'none',
        }),
      }))}
      {...ButtonProps}
    />
  )
}

const useDocNavigate = (length: number) => {
  const popDocNavStack = useBoundStore((state) => state.popDocNavStack)
  return {
    navigateDocStack: (index: number) => {
      if (length === 1) {
        return
      }
      if (index === length - 1) {
        return 0
      }
      let diff = length - index
      while (--diff > 0) popDocNavStack()
    },
    isLast: (index: number) => index === length - 1,
  }
}

export default function Documentation() {
  const schemaError = useBoundStore((state) => state.schemaError)
  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)
  const toggleAside = useBoundStore((state) => state.toggleAside)
  const docNavStack = useBoundStore((state) => state.docNavStack)
  const doc = useDocumentationLocale()

  const { isLast, navigateDocStack } = useDocNavigate(docNavStack.length)

  if (isSchemaFetching) {
    return <Loader />
  }

  return (
    <Stack minHeight={1} minWidth={240} boxSizing="border-box" p={2}>
      <Stack direction="row" alignItems="center">
        <Typography
          flex={1}
          pr={2}
          variant="h2"
          fontSize={24}
          fontWeight="regular"
        >
          {doc.typography.heading.main}
        </Typography>
        <IconButton onClick={() => toggleAside(false)}>
          <West />
        </IconButton>
      </Stack>

      {!schemaError && (
        <Breadcrumbs
          separator=">"
          sx={{ mt: 1, mb: 1.5, '.MuiBreadcrumbs-separator': { mx: 0.5 } }}
        >
          {docNavStack.map(({ name }, index) => (
            <DocNavLink
              key={name}
              isActive={isLast(index)}
              onClick={() => navigateDocStack(index)}
              sx={{
                minWidth: 'auto',
                py: 0.25,
                px: 1,
                '&:first-of-type': {
                  ml: -0.5,
                },
              }}
            >
              {name}
            </DocNavLink>
          ))}
        </Breadcrumbs>
      )}

      {(({ def }) => {
        if (schemaError) {
          return <DocError message={schemaError?.message} />
        } else if (docNavStack.length <= 1) {
          return <DocRoot />
        } else if (isFieldType(def) || isArgumentType(def)) {
          return <DocProp type={def} />
        } else if (isNamedType(def)) {
          return <DocType type={def} />
        } else {
          return <DocError message={doc.typography.body.notSupported} />
        }
      })(docNavStack.at(-1) as DocNavStackItem)}
    </Stack>
  )
}
