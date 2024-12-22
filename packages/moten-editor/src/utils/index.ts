import { customAlphabet } from 'nanoid'
import { defineAsyncComponent, markRaw, type Component } from 'vue'

/**
 * id生成器
 * @param length 生成长度
 * @returns  返回生成的id
 */
export const nanoid = (length = 8) => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', length)
  return nanoid()
}

/**
 * 延迟函数
 * @param delay 延迟时间
 * @returns
 */
export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * 动态引入组件
 * @param name 组件名
 * @param importUrl 引入所有的组件 import.meta.glob('@/components/config/**')
 * @returns
 */
export const batchDynamicComponents = (name: string, importUrl: Record<string, Component>) => {
  const components = importUrl
  const componentMap = Object.assign(
    {},
    ...Object.keys(components).map((item) => {
      const name = item?.split('/')?.pop()?.replace('.vue', '') || ''
      return {
        [name]: components[item]
      }
    })
  )
  const importComponent = componentMap[name]

  if (!importComponent) return ''

  return markRaw(defineAsyncComponent(importComponent))
}
