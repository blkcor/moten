import '@/assets/style/index.scss'
import './index.css'
import imageSchema from '@/components/image/schema'
import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'
import MoImage from '@/components/image'
import { App } from 'vue-demi'

export const schema = {
  image: imageSchema
}

// components list
const components = [MoImage]

function install(app: App) {
  components.forEach((component) => {
    console.log(component.name)
    const { name } = component
    if (name) app.component(name, component)
  })
}

export default { install, MoImage }

export const schemaAllViewport = _schemaAllViewport
