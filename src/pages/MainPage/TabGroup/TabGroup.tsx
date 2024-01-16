import mergeSx from '@/utils/mergeSx'
import {
  TabContext,
  TabList,
  TabPanel,
  type TabListProps,
  type TabPanelProps,
} from '@mui/lab'
import {
  Box,
  Stack,
  Tab,
  type StackProps,
  type SxProps,
  type TabProps,
} from '@mui/material'
import { useState } from 'react'
import { Resizer, ResizerDefaults } from '../ResizeGroup'
import defaults from './defaults'

export default function TabGroup(props: {
  currentValue: string
  onChange?: TabListProps['onChange']
  tabs: {
    value: string
    jsx: React.ReactNode
    label?: string
    TabPanelProps?: TabPanelProps
    TabProps?: TabProps
  }[]
  StackProps?: StackProps
  TabListProps?: Omit<TabListProps, 'onChange'>
}) {
  const { tabs, currentValue, onChange, TabListProps } = props
  const { StackProps: { sx: stackSx, ...StackProps } = {} } = props
  const [uncontrolledValue, setUncontrolledValue] = useState(currentValue)

  const isControlled = onChange !== undefined

  const styles = {
    '& .MuiTabs-root': {
      minHeight: defaults.Tab.height,
    },
    '& .MuiTabs-indicator': {
      height: defaults.Tab.borderSize + 'px',
    },
    '& .MuiTabPanel-root': {
      flex: 1,
      padding: 0,
      overflow: 'overlay',
      scrollbarGutter: 'stable',
    },
    '& .MuiTab-root': {
      minHeight: defaults.Tab.height,
      height: defaults.Tab.height,
      '&.Mui-selected': {
        cursor: 'default',
      },
    },
  } satisfies SxProps

  return (
    <Stack
      flex={1}
      height={1}
      direction="column"
      sx={mergeSx(stackSx, styles)}
      {...StackProps}
    >
      <TabContext value={isControlled ? currentValue : uncontrolledValue}>
        <Box position="relative" overflow="hidden">
          <TabList
            variant="scrollable"
            {...TabListProps}
            onChange={(e, v) =>
              isControlled ? onChange(e, v) : setUncontrolledValue(v)
            }
          >
            {tabs.map(({ value, label = value, TabProps }) => (
              <Tab
                key={value}
                value={value}
                label={label}
                disableTouchRipple={true}
                {...TabProps}
              />
            ))}
          </TabList>
          <Resizer
            orientation="horizontal"
            padding={0}
            BoxProps={{
              marginTop: -ResizerDefaults.thickness + 'px',
            }}
          />
        </Box>
        {tabs.map(({ value, jsx, TabPanelProps }) => (
          <TabPanel key={value} value={value} {...TabPanelProps}>
            {jsx}
          </TabPanel>
        ))}
      </TabContext>
    </Stack>
  )
}
