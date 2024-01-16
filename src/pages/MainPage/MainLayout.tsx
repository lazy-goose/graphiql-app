import { Loader } from '@/components/Loader'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Box, Button, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { Suspense, useLayoutEffect, useRef } from 'react'
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
    StackProps: {
      sx: {
        [`& > .${ResizeGroupClassName.FragmentWindow(0)}`]: {
          minHeight:
            TabGroupDefaults.Tab.height - ResizerDefaults.padding + 'px',
        },
        [`& > .${ResizeGroupClassName.FragmentWindow(1)}`]: {
          minHeight:
            TabGroupDefaults.Tab.height +
            TabGroupDefaults.Tab.borderSize +
            'px',
        },
        [`& > .${ResizeGroupClassName.FragmentResizer()}`]: {
          marginBottom: -ResizerDefaults.padding + 'px',
        },
      },
    },
  } satisfies Pick<ResizeGroupProps, 'StackProps'>
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
  const {
    locale: { mainPage },
  } = useLocale()
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
        initialSizes={[0.7, 0.3]}
        {...verticalLayoutStackProps()}
      >
        <ResizeFragment id="Row1">
          <Box height={1}>
            <TabGroup
              currentValue="Request"
              tabs={[
                {
                  value: 'Request',
                  label: mainPage.tab.request,
                  jsx: request,
                },
                {
                  value: 'Response',
                  label: mainPage.tab.response,
                  jsx: response,
                },
              ]}
            />
          </Box>
        </ResizeFragment>
        <ResizeFragment id="Row2">
          <Box height={1}>
            <TabGroup
              currentValue="Variables"
              tabs={[
                {
                  value: 'Variables',
                  label: mainPage.tab.variables,
                  jsx: variables,
                },
                {
                  value: 'Headers',
                  label: mainPage.tab.headers,
                  jsx: headers,
                },
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
  const {
    locale: { mainPage },
  } = useLocale()
  const isAsideOpen = useBoundStore((s) => s.isAsideOpen)
  return (
    <ResizeGroup direction="row" initialSizes={[0.2, 0.4, 0.4]}>
      <ResizeFragment id="Col1" min={0.2} max={0.4} collapse={!isAsideOpen}>
        <Box height={1} overflow="auto">
          {documentation}
        </Box>
      </ResizeFragment>
      <ResizeFragment id="Col2" min={0.3}>
        <Box height={1}>
          <ResizeGroup
            direction="col"
            initialSizes={[0.7, 0.3]}
            {...verticalLayoutStackProps()}
          >
            <ResizeFragment id="Col2Row1">
              <TabGroup
                currentValue="Request"
                tabs={[
                  {
                    value: 'Request',
                    label: mainPage.tab.request,
                    jsx: request,
                  },
                ]}
              />
            </ResizeFragment>
            <ResizeFragment id="Col2Row2">
              <TabGroup
                currentValue="Headers"
                tabs={[
                  {
                    value: 'Variables',
                    label: mainPage.tab.variables,
                    jsx: variables,
                  },
                  {
                    value: 'Headers',
                    label: mainPage.tab.headers,
                    jsx: headers,
                  },
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
            tabs={[
              {
                value: 'Response',
                label: mainPage.tab.response,
                jsx: response,
              },
            ]}
          />
        </Box>
      </ResizeFragment>
    </ResizeGroup>
  )
}

export default function MainLayout(slots: MainLayoutSlots) {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const mainBoxRef = useRef<HTMLDivElement | null>(null)

  const suspendedSlots = Object.fromEntries(
    Object.entries(slots).map(([key, jsx]) => [
      key,
      <Suspense key={key} fallback={<Loader />}>
        {jsx}
      </Suspense>,
    ]),
  ) as MainLayoutSlots

  useLayoutEffect(() => {
    if (mainBoxRef.current) {
      const offsetTop = Math.round(mainBoxRef.current.offsetTop)
      const minHeight = 600
      const heightStr = `calc(max(100lvh - ${offsetTop + 'px'}, ${
        minHeight + 'px'
      }))`
      mainBoxRef.current.style.setProperty('height', heightStr)
    }
  }, [mobile])

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
      {mobile ? (
        <MainMobileLayout {...suspendedSlots} />
      ) : (
        <MainDesktopLayout {...suspendedSlots} />
      )}
    </Box>
  )
}
