import { useBoundStore } from '@/store'
import { Box, Button, Drawer, useMediaQuery } from '@mui/material'
import { useLayoutEffect, useRef } from 'react'
import {
  ResizeGroup,
  ResizeGroupClassName,
  ResizerDefaults,
} from './ResizeGroup'
import ResizeFragment from './ResizeGroup/ResizeFragment'
import { type ResizeGroupProps } from './ResizeGroup/ResizeGroup'
import { TabGroupDefaults } from './TabGroup'
import TabGroup from './TabGroup/TabGroup'

type MainLayoutSlots = {
  documentation: React.ReactNode
  request: React.ReactNode
  response: React.ReactNode
  variables: React.ReactNode
  headers: React.ReactNode
}

const verticalLayoutStackProps = () => {
  return {
    stackProps: {
      sx: {
        [`& > .${ResizeGroupClassName.FragmentWindow(0)}`]: {
          minHeight:
            TabGroupDefaults.Tab.height - ResizerDefaults.padding + 'px',
        },
        [`& > .${ResizeGroupClassName.FragmentWindow(1)}`]: {
          minHeight: TabGroupDefaults.Tab.height + 'px',
        },
        [`& > .${ResizeGroupClassName.FragmentResizer()}`]: {
          marginBottom: -ResizerDefaults.padding + 'px',
        },
      },
    },
  } satisfies Pick<ResizeGroupProps, 'stackProps'>
}

const MainMobileLayout = ({
  documentation,
  headers,
  request,
  response,
  variables,
}: MainLayoutSlots) => {
  const isAsideOpen = useBoundStore((s) => s.isAsideOpen)
  const toggleAside = useBoundStore((s) => s.toggleAside)
  return (
    <Box height={1}>
      <Drawer
        open={isAsideOpen}
        onClose={() => toggleAside(false)}
        PaperProps={{
          sx: {
            width: 'clamp(320px, 100%, 500px)',
          },
        }}
      >
        <Button onClick={() => toggleAside(false)}>Close</Button>
        {documentation}
      </Drawer>
      <ResizeGroup
        direction="col"
        sizes={[0.7, 0.3]}
        preventUpdate={false}
        {...verticalLayoutStackProps()}
      >
        <ResizeFragment id="Row1">
          <Box height={1}>
            <TabGroup
              currentValue="Request"
              tabs={[
                { value: 'Request', jsx: request },
                { value: 'Response', jsx: response },
              ]}
            />
          </Box>
        </ResizeFragment>
        <ResizeFragment id="Row2">
          <Box height={1}>
            <TabGroup
              currentValue="Variables"
              tabs={[
                { value: 'Variables', jsx: variables },
                { value: 'Headers', jsx: headers },
              ]}
            />
          </Box>
        </ResizeFragment>
      </ResizeGroup>
    </Box>
  )
}

const MainDesktopLayout = ({
  documentation,
  headers,
  request,
  response,
  variables,
}: MainLayoutSlots) => {
  const isAsideOpen = useBoundStore((s) => s.isAsideOpen)
  return (
    <ResizeGroup direction="row" sizes={[0.2, 0.4, 0.4]} preventUpdate={false}>
      <ResizeFragment id="Col1" min={0.2} max={0.4} collapse={!isAsideOpen}>
        <Box height={1} overflow="auto">
          {documentation}
        </Box>
      </ResizeFragment>
      <ResizeFragment id="Col2" min={0.3}>
        <Box height={1}>
          <ResizeGroup
            direction="col"
            sizes={[0.7, 0.3]}
            preventUpdate={false}
            {...verticalLayoutStackProps()}
          >
            <ResizeFragment id="Col2Row1">
              <TabGroup
                currentValue="Request"
                tabs={[{ value: 'Request', jsx: request }]}
              />
            </ResizeFragment>
            <ResizeFragment id="Col2Row2">
              <TabGroup
                currentValue="Variables"
                tabs={[
                  { value: 'Variables', jsx: variables },
                  { value: 'Headers', jsx: headers },
                ]}
              />
            </ResizeFragment>
          </ResizeGroup>
        </Box>
      </ResizeFragment>
      <ResizeFragment id="Col3">
        <Box height={1}>
          <TabGroup
            currentValue="Response"
            tabs={[{ value: 'Response', jsx: response }]}
          />
        </Box>
      </ResizeFragment>
    </ResizeGroup>
  )
}

export default function MainLayout(slots: MainLayoutSlots) {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const mainBoxRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (mainBoxRef.current) {
      const offsetTop = Math.round(mainBoxRef.current.offsetTop)
      const minHeight = 600
      const heightStr = `calc(max(100lvh - ${offsetTop + 'px'}, ${
        minHeight + 'px'
      }))`
      mainBoxRef.current.style.setProperty('height', heightStr)
    }
  }, [isMobile])

  return (
    <Box
      ref={mainBoxRef}
      sx={(theme) => ({
        borderWidth: ResizerDefaults.thickness + 'px',
        borderColor: theme.palette.divider,
        borderStyle: 'solid',
        '& ::-webkit-scrollbar': {
          height: 8 + 'px',
          width: 8 + 'px',
          overflow: 'overlay',
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
        },
      })}
    >
      {isMobile ? (
        <MainMobileLayout {...slots} />
      ) : (
        <MainDesktopLayout {...slots} />
      )}
    </Box>
  )
}
