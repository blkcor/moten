<template>
  <div class="edit-config-page">
    <edit-config-render :list="list" @callback="callback" :schema="schema" />
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { ref } from 'vue'
import EditConfigRender from './config-render.vue'
import { pageSchema, type PageSchemaFormData } from '@/config/schema'
import deepmerge from 'deepmerge'

const edit = useEditStore()
const schema = ref(pageSchema)
const properties = pageSchema.properties
const list = ref<(typeof properties)[keyof typeof properties][]>([])

const listResult = Object.fromEntries(
  Object.entries(properties).map((childItem) => {
    const [key, value] = childItem
    return [key, { ...value, key, formData: edit.pageConfig || {} }]
  })
)

list.value = [...Object.values(listResult)]

const callback = (params: { data: object }) => {
  const { data } = params as { data: Record<string, any> }
  const key = Object.keys(data)[0]
  const pageConfig = edit.pageConfig || {}
  edit.setPageConfig(deepmerge.all([pageConfig, data]) as PageSchemaFormData)

  // 更新每一项的formData
  list.value.forEach((item) => {
    if (item.key === key) {
      const itemFormData = deepmerge.all([item?.formData || {}, data[key]])
      item.formData = itemFormData
      return
    }
  })
}
</script>

<style scoped lang="scss">
.edit-config-page {
  width: 100%;
}
</style>
