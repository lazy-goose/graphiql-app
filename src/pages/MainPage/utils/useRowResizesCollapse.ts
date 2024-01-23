import { useBoundStore } from '@/store'
import { useEffect, useRef } from 'react'
import {
  type ResizeCallback,
  type ResizeGroupController,
} from '../ResizeGroup/ResizeGroup'

export function useRowSizesCollapse() {
  const toggleIsOpened = useBoundStore((s) => s.toggleSettingsWindowOpen)
  const prevSizes = useBoundStore((s) => s.settingsWindowPrevSizes)
  const isOpened = useBoundStore((s) => s.isSettingsWindowOpen)

  const rowGroupControllerRef = useRef<ResizeGroupController>(null)

  const toggleRowCollapse = (collapse = isOpened) => {
    const controller = rowGroupControllerRef.current
    if (!controller) {
      return
    }
    const fractions = controller.getFrSizes()
    if (collapse) {
      controller.setFrSizes([1, 0])
      toggleIsOpened(false, fractions)
    } else {
      controller.setFrSizes(prevSizes || [0.7, 0.3])
      toggleIsOpened(true)
    }
  }

  useEffect(() => {
    const controller = rowGroupControllerRef.current
    if (!controller) {
      return
    }
    const onResize: ResizeCallback = (next) => {
      toggleIsOpened(next[1] >= 0.04, null)
    }
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
