import { COMPONENT_PREFIX as COMPONENT_PREFIX_ } from './config/index'
import '@/assets/style/index.scss'
import './index.css'
import imageSchema from '@/components/image/schema'
import columnSchema from '@/components/column/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'
import MoImage from '@/components/image'
import MoColumn from '@/components/column'
import { App } from 'vue-demi'

export const schema = {
  image: imageSchema,
  column: columnSchema
}

// components list
const components = [MoImage, MoColumn]

function install(app: App) {
  components.forEach((component) => {
    const { name } = component
    if (name) app.component(name, component)
  })
}

export default { install, MoImage, MoColumn }

export const schemaAllViewport = _schemaAllViewport
export const COMPONENT_PREFIX = COMPONENT_PREFIX_
