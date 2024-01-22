import { Loader } from '@/components/Loader'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import createStorageObject, { safeParse } from '@/utils/createStorageObject'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { z } from 'zod'
import { ResizeGroup, ResizerDefaults } from './ResizeGroup'
import ResizeFragment from './ResizeGroup/ResizeFragment'
import TabGroup from './TabGroup/TabGroup'
import { useRowSizesCollapse, verticalLayoutStackProps } from './utils'

type MainLayoutSlots = {
  documentation: React.ReactNode
  request: React.ReactNode
  response: React.ReactNode
  variables: React.ReactNode
  headers: React.ReactNode
}

const CollapseGroup = (
  props: React.PropsWithChildren<{ onChange: (bool: boolean) => void }>,
) => {
  const { onChange, children } = props
  const isOpen = useBoundStore((s) => s.isSettingsWindowOpen)
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

const useCacheSizes = () => {
  const email = useBoundStore((s) => s.user?.email || 'anonymous')
  return useMemo(() => {
    const { getCacheItem, setCacheItem } = createStorageObject(
      `mainLayout.${email}`,
    )
    const makeSetter = (key: string) => (sizes: number[]) => {
      return setCacheItem(key, JSON.stringify(sizes))
    }
    const getValue = (key: string, fallback: number[]) => {
      return safeParse(getCacheItem(key), z.array(z.number()), fallback)
    }
    return {
      col: getValue('Col', [0.2, 0.4, 0.4]),
      row: getValue('Row', [0.7, 0.3]),
      setCol: makeSetter('Col'),
      setRow: makeSetter('Row'),
    }
  }, [email])
}

const MainMobileLayout = (props: MainLayoutSlots) => {
  const { documentation, request, response, variables, headers } = props
  const isAsideOpen = useBoundStore((s) => s.isAsideOpen)
  const settingsTab = useBoundStore((s) => s.settingsWindowTabGroup)
  const setSettingsTab = useBoundStore((s) => s.setSettingsWindowTabGroup)
  const {
    locale: { mainPage },
  } = useLocale()
  const { ref: rowControllerRef, toggleRowCollapse } = useRowSizesCollapse()
  const { row, setRow } = useCacheSizes()
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
        initialSizes={row}
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
              currentValue={settingsTab}
              onChange={(_, value) => {
                setSettingsTab(value)
              }}
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
  const settingsTab = useBoundStore((s) => s.settingsWindowTabGroup)
  const setSettingsTab = useBoundStore((s) => s.setSettingsWindowTabGroup)
  const { ref: rowControllerRef, toggleRowCollapse } = useRowSizesCollapse()
  const { col, row, setCol, setRow } = useCacheSizes()
  return (
    <ResizeGroup direction="row" initialSizes={col} onResize={setCol}>
      <ResizeFragment id="Col1" min={0.2} max={0.4} collapse={!isAsideOpen}>
        <Box height={1} overflow="auto">
          {documentation}
        </Box>
      </ResizeFragment>
      <ResizeFragment id="Col2" min={0.3}>
        <Box height={1}>
          <ResizeGroup
            direction="col"
            initialSizes={row}
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
                  currentValue={settingsTab}
                  onChange={(_, value) => {
                    setSettingsTab(value)
                  }}
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
        borderLeftWidth: 0,
        borderRightWidth: 0,
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
