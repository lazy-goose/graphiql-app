import { Loader } from '@/components/Loader'
import { useLocale } from '@/hooks/useLocale'
import { Chip, Stack } from '@mui/material'
import { type GraphQLScalarType } from 'graphql'
import { useAutoTranslate } from '../utils/hooks/useAutoTranslate'
import { DocLayout, DocName, DocSection } from './@parts/DocLayout'

export default function DocPropScalar(props: {
  type: GraphQLScalarType
  fieldName?: string
}) {
  const { type: scalarType, fieldName } = props
  const {
    locale: {
      meta: { code },
      mainPage: { documentation: doc },
    },
  } = useLocale()

  const { trigger, isFetching, translated } = useAutoTranslate({
    from: 'en',
    to: code,
    text: scalarType.description,
  })

  const disableChip = code === 'en' || Boolean(translated.length)

  return (
    <DocLayout flex={1}>
      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <DocName noDivider>
          {fieldName ? fieldName + ': ' : ''}
          {scalarType.toString()}
        </DocName>
        <Chip
          label={doc.typography.chip.autotranslate}
          size="small"
          variant="outlined"
          onClick={trigger}
          disabled={disableChip}
        />
      </Stack>
      {isFetching ? (
        <Loader flex={1} />
      ) : (
        <DocSection
          markdown
          heading={`${scalarType.name} ${doc.typography.heading.scalar.part}`}
        >
          {translated || scalarType.description}
        </DocSection>
      )}
    </DocLayout>
  )
}
