import Component from '..'
import CurrentComponent from '../index.vue'
import { describe, expect, test } from 'vitest'
import { createApp } from 'vue3'
import { mount } from '@vue/test-utils'
import { COMPONENT_PREFIX } from '@/config/index'

const componentCode = 'image'
const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`

describe(`${componentCode}基本测试`, () => {
  test('组件名测试', () => {
    const app = createApp({}).use(Component)
    // app.component：1、通过名称获取组件 2、注册组件（方法重载）
    expect(app.component(Component.name || '')).toBeTruthy()
  })
  test('测试主要class', () => {
    const wrapper = mount(CurrentComponent)
    expect(wrapper.find(componentClass).classes).toBeTruthy()
    wrapper.unmount()
  })
})

describe(`${componentCode} 组件props测试`, () => {
  test('测试src属性', () => {
    const src = 'https://placecats.com/300/200'
    const wrapper = mount(CurrentComponent, {
      props: {
        data: {
          src: {
            desktop: src,
            mobile: src
          }
        }
      }
    })
    expect(wrapper.find(componentClass + ' .image').attributes('src')).toContain(src)
  })
})
