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
    tabPanelProps?: TabPanelProps
    tabProps?: TabProps
  }[]
  stackProps?: StackProps
  tabListProps?: Omit<TabListProps, 'onChange'>
}) {
  const {
    tabs,
    currentValue,
    onChange,
    stackProps: { sx: stackSx, ...restStackProps } = {},
    tabListProps,
  } = props
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
      sx={[styles, ...(Array.isArray(stackSx) ? stackSx : [stackSx])]}
      {...restStackProps}
    >
      <TabContext value={isControlled ? currentValue : uncontrolledValue}>
        <Box position="relative" overflow="hidden">
          <TabList
            variant="scrollable"
            {...tabListProps}
            onChange={(e, v) =>
              isControlled ? onChange(e, v) : setUncontrolledValue(v)
            }
          >
            {tabs.map(({ value, label = value, tabProps }) => (
              <Tab
                key={value}
                value={value}
                label={label}
                disableTouchRipple={true}
                {...tabProps}
              />
            ))}
          </TabList>
          <Resizer
            orientation="horizontal"
            padding={0}
            boxProps={{
              marginTop: -ResizerDefaults.thickness + 'px',
            }}
          />
        </Box>
        {tabs.map(({ value, jsx, tabPanelProps }) => (
          <TabPanel key={value} value={value} {...tabPanelProps}>
            {jsx}
          </TabPanel>
        ))}
      </TabContext>
    </Stack>
  )
}
