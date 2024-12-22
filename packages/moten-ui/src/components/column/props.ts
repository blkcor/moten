import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type MoColumnPropsData = {
  /**
   * 列数
   */
  cols?: {
    desktop: number[]
    mobile: number[]
  }
  /**
   * 背景
   */
  background: {
    desktop: string
    mobile: string
  }
}
export const props = {
  data: {
    type: Object as PropType<MoColumnPropsData>,
    default: () => ({
      cols: {
        desktop: [0.5, 0.5],
        mobile: [0.5, 0.5]
      },
      background: {
        desktop: '',
        mobile: ''
      }
    })
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator(val: ComponentViewport) {
      return ['desktop', 'top'].includes(val)
    }
  },
  /**
   * children子项作为slot进行暴露
   */
  children: {
    type: Object,
    default: () => ({
      desktop: [[], []],
      mobile: [[], []]
    })
  }
}
