import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type MoColumnPropsData = {
  src?: {
    desktop: string
    mobile: string
  }
}
export const props = {
  data: {
    type: Object as PropType<MoColumnPropsData>,
    default: () => ({
      src: {
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
