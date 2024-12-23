import { COMPONENT_PREFIX as COMPONENT_PREFIX_ } from './config/index'
import '@/assets/style/index.scss'
import './index.css'
import imageSchema, { type MoImageSchema } from '@/components/image/schema'
import columnSchema, { type MoColumnSchema } from '@/components/column/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'
import MoImage from '@/components/image'
import MoColumn from '@/components/column'
import { App } from 'vue-demi'

export const schema = {
  image: imageSchema,
  column: columnSchema
}

export type MoComponentSchema = {
  image: MoImageSchema
  column: MoColumnSchema
}

// components list
const components = [MoImage, MoColumn]

function install(
  app: App,
  options: {
    platform: 'editor' | 'user'
  }
) {
  components.forEach((component) => {
    const { name } = component
    if (name) app.component(name, component)
  })
  app.provide('platform', options.platform)
}

export default { install, MoImage, MoColumn }

export const schemaAllViewport = _schemaAllViewport
export const COMPONENT_PREFIX = COMPONENT_PREFIX_
