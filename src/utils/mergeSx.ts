import { type SxProps, type Theme } from '@mui/material'

export default function mergeSx<T extends object = Theme>(
  ...sxProps: (SxProps<T> | undefined | false | null)[]
) {
  return sxProps
    .reverse()
    .filter((sx) => [undefined, null, false].every((v) => v !== sx))
    .reduce(
      (prev, curr) => [
        ...(Array.isArray(prev) ? prev : [prev]),
        ...(Array.isArray(curr) ? curr : [curr]),
      ],
      [],
    ) as SxProps<T>
}
