import { Box, Stack, type StackProps } from '@mui/material'

export default function PasswordStrengthBar(props: {
  current: number
  levels: {
    color: string
    text: string
  }[]
  stackProps?: StackProps
  disabled: boolean
}) {
  const { current, levels, stackProps, disabled } = props
  const baseColor = '#e0e0e0'
  const currentLevel = levels[current]
  return (
    <Stack
      component="span"
      direction="row"
      alignItems="center"
      mt={1}
      gap={1}
      height="1.25em"
      fontSize="1.25em"
      color="inherit"
      {...stackProps}
    >
      {Array.from({ length: levels.length }).map((_, lvlIndex) => (
        <Box
          key={lvlIndex}
          component="span"
          flex={1}
          height="5px"
          sx={{
            backgroundColor:
              currentLevel && !disabled && lvlIndex <= current
                ? currentLevel.color
                : baseColor,
          }}
        />
      ))}
      <Box component="span" ml={1} minWidth="10ch">
        {currentLevel && currentLevel.text}
      </Box>
    </Stack>
  )
}
