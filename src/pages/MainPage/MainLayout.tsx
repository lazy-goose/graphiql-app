import { Loader } from '@/components/Loader'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import createStorageObject, { safeParse } from '@/utils/createStorageObject'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { z } from 'zod'
import {
  ResizeGroup,
  ResizeGroupClassName,
  ResizerDefaults,
} from './ResizeGroup'
import ResizeFragment from './ResizeGroup/ResizeFragment'
import {
  type ResizeCallback,
  type ResizeGroupController,
  type ResizeGroupProps,
} from './ResizeGroup/ResizeGroup'
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

const useRowSizesCollapse = () => {
  const toggleIsOpened = useBoundStore((s) => s.toggleSettingsWindowOpen)
  const isOpened = useBoundStore((s) => s.isSettingsWindowOpen)

  const rowGroupControllerRef = useRef<ResizeGroupController>(null)
  const savedSizesRef = useRef<number[] | null>(null)

  const toggleRowCollapse = (collapse = isOpened) => {
    const controller = rowGroupControllerRef.current
    if (!controller) {
      return
    }
    const fractions = controller.getFrSizes()
    if (collapse) {
      controller.setFrSizes([1, 0])
      savedSizesRef.current = fractions
      toggleIsOpened(false)
    } else {
      controller.setFrSizes(savedSizesRef.current || [0.7, 0.3])
      toggleIsOpened(true)
    }
  }

  useEffect(() => {
    const controller = rowGroupControllerRef.current
    if (!controller) {
      return
    }
    const onResize: ResizeCallback = (_, next) => {
      toggleIsOpened(next[1] >= 0.04)
      savedSizesRef.current = null
    }
    onResize([], controller.getFrSizes())
    controller.subscribeResize(onResize, 1)
    return () => {
      controller.unsubscribeResize(onResize)
    }
  }, [toggleIsOpened])

  return {
    ref: rowGroupControllerRef,
    toggleRowCollapse,
  }
}

const CollapseGroup = (
  props: React.PropsWithChildren<{ onChange: (bool: boolean) => void }>,
) => {
  const { onChange, children } = props
  const isOpen = useBoundStore((state) => state.isSettingsWindowOpen)
  return (
    <Box height={1} position="relative">
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          right: 5,
          top: 2,
          zIndex: 1,
        }}
        onClick={() => onChange(!isOpen)}
      >
        {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
      </IconButton>
      {children}
    </Box>
  )
}

const cacheSizeUtils = (key: string, fallback: number[]) => {
  const { getCacheItem, setCacheItem } = createStorageObject('mainLayout')
  const setter = (sizes: number[]) => setCacheItem(key, JSON.stringify(sizes))
  const stringified = getCacheItem(key)
  const cached = safeParse(stringified, z.array(z.number()), fallback)
  return [setter, cached] as const
}

const [setCol, colSizesInit] = cacheSizeUtils('Layout.Col', [0.2, 0.4, 0.4])
const [setRow, rowSizesInit] = cacheSizeUtils('Layout.Row', [0.7, 0.3])

const MainMobileLayout = (props: MainLayoutSlots) => {
  const { documentation, request, response, variables, headers } = props
  const isAsideOpen = useBoundStore((s) => s.isAsideOpen)
  const {
    locale: { mainPage },
  } = useLocale()
  const { ref: rowControllerRef, toggleRowCollapse } = useRowSizesCollapse()
  return (
    <Box height={1}>
      <Drawer
        open={isAsideOpen}
        PaperProps={{
          sx: {
            width: 'clamp(320px, 100%, 500px)',
          },
        }}
      >
        {documentation}
      </Drawer>
      <ResizeGroup
        direction="col"
        initialSizes={rowSizesInit}
        onResize={setRow}
        controllerRef={rowControllerRef}
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
          <CollapseGroup onChange={() => toggleRowCollapse()}>
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
          </CollapseGroup>
        </ResizeFragment>
      </ResizeGroup>
    </Box>
  )
}

const MainDesktopLayout = (props: MainLayoutSlots) => {
  const { documentation, request, response, variables, headers } = props
  const {
    locale: { mainPage },
  } = useLocale()
  const isAsideOpen = useBoundStore((s) => s.isAsideOpen)
  const { ref: rowControllerRef, toggleRowCollapse } = useRowSizesCollapse()
  return (
    <ResizeGroup direction="row" initialSizes={colSizesInit} onResize={setCol}>
      <ResizeFragment id="Col1" min={0.2} max={0.4} collapse={!isAsideOpen}>
        <Box height={1} overflow="auto">
          {documentation}
        </Box>
      </ResizeFragment>
      <ResizeFragment id="Col2" min={0.3}>
        <Box height={1}>
          <ResizeGroup
            direction="col"
            initialSizes={rowSizesInit}
            onResize={setRow}
            controllerRef={rowControllerRef}
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
              <CollapseGroup onChange={() => toggleRowCollapse()}>
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
              </CollapseGroup>
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
