import { ResizeGroupClassName, ResizerDefaults } from '../ResizeGroup'
import { type ResizeGroupProps } from '../ResizeGroup/ResizeGroup'
import { TabGroupDefaults } from '../TabGroup'

export function verticalLayoutStackProps() {
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
