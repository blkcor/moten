import type { BaseBlock } from '@/types/edit'
import { COMPONENT_PREFIX } from '@moten/ui'

export const baseBlocks: BaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: `${COMPONENT_PREFIX}-image`,
    icon: 'image',
    formData: {}
  },
  {
    id: '',
    name: '视频',
    code: `${COMPONENT_PREFIX}-video`,
    icon: 'video',
    formData: {}
  },
  {
    id: '',
    name: '文本',
    code: `${COMPONENT_PREFIX}-text`,
    icon: 'text',
    formData: {}
  },
  {
    id: '',
    name: '幻灯片',
    code: `${COMPONENT_PREFIX}-swiper`,
    icon: 'swiper',
    formData: {}
  },
  {
    id: '',
    name: '留白',
    code: `${COMPONENT_PREFIX}-blank`,
    icon: 'blank',
    formData: {}
  }
]

export const seniorBlocks: BaseBlock[] = [
  {
    id: '',
    name: '多行',
    code: `${COMPONENT_PREFIX}-row`,
    icon: 'row',
    nested: true,
    children: [[], []],
    formData: {}
  },
  {
    id: '',
    name: '多列',
    code: `${COMPONENT_PREFIX}-column`,
    icon: 'column',
    nested: true,
    children: [[], []],
    formData: {}
  },
  {
    id: '',
    name: '画布',
    code: `${COMPONENT_PREFIX}-canvas`,
    icon: 'canvas',
    nested: true,
    children: [[], []],
    formData: {}
  }
]

export const canvasBlocks: BaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: `${COMPONENT_PREFIX}-image`,
    icon: 'image',
    formData: {}
  },
  {
    id: '',
    name: '文本',
    code: `${COMPONENT_PREFIX}-text`,
    icon: 'text',
    formData: {}
  }
]
