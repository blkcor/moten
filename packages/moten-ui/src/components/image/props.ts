import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type MoImagePropsData = {
  /**
   * 是否展示
   */
  display?: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 图片链接
   */
  src?: {
    desktop: string
    mobile: string
  }
  /**
   * 跳转链接
   */
  link?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片宽度
   */
  width?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片高度
   */
  height?: {
    desktop: string
    mobile: string
  }
}
export const props = {
  data: {
    type: Object as PropType<MoImagePropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      src: {
        desktop: '',
        mobile: ''
      },
      link: {
        desktop: '',
        mobile: ''
      },
      width: {
        desktop: '',
        mobile: ''
      },
      height: {
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
  }
}
