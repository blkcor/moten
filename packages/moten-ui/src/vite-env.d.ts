/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // 声明一个通用的 Vue 组件类型（template-only、script setup等情况都可以使用）
  const component: DefineComponent<{}, {}, any>
  export default component
}
