import { schemaAllViewport } from '@/utils/components'
import { Type, type Static } from '@sinclair/typebox'

// errorMessage: 自定义avj校验错误信息
// rules: 自定义el-form校验规则
const display = Type.Boolean({
  code: 'config-viewport',
  title: '屏幕',
  default: true,
  errorMessage:{
    required: '请选择屏幕'
  },
  rules:[{
    required: true,
    message: '请选择屏幕',
    trigger: 'change'
  }]
})
const src = Type.String({
  code: 'config-files',
  title: '图片',
  default: '',
  minLength:1,
  errorMessage:{
    required: '请上传图片',
    minLength: '请上传图片'
  },
  rules:[{
    required: true,
    message: '请上传图片',
    min:1,
    trigger: 'change'
  }]
})

const link = Type.String({
  code: 'config-input',
  title: '链接',
  default: '',
  placeholder: '请输入链接',
  minLength:1,
  errorMessage:{
    required: '请输入链接',
    minLength: '请输入链接'
  },
  rules:[{
    required: true,
    message: '请输入链接',
    min:1,
    trigger: 'change'
  }]
})
const width = Type.String({
  code: 'config-input',
  title: '宽度',
  default: '100%',
  placeholder: '请输入宽度',
  errorMessage:{
    required: '请输入宽度'
  },
  rules:[{
    required: true,
    message: '请输入宽度',
    trigger: 'change'
  }]
})
const height = Type.String({
  code: 'config-input',
  title: '高度',
  default: '295px',
  placeholder: '请输入高度',
  errorMessage:{
    required: '请输入高度'
  },
  rules:[{
    required: true,
    message: '请输入高度',
    trigger: 'change'
  }]
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  src: schemaAllViewport(src),
  link: schemaAllViewport(link),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height)
})

export type MoImageSchema = Static<typeof schema>

export default schema
