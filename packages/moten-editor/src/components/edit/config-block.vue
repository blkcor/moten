<template>
  <div class="edit-config-block">
    <edit-config-render :list="list" @callback="callback">
      <div v-if="!edit.currentSelect">
        <el-empty description="请在左侧拖入组件后，点击选中组件">
          <template #default>
            <v-icon icon="dragBlank" class="icon" />
          </template>
        </el-empty>
      </div>
    </edit-config-render>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { ref, watch } from 'vue'
import EditConfigRender from './config-render.vue'
import { type BlockSchemaKeys, blockSchema } from '@/config/schema'
import { findNodeById } from './nested'
import deepmerge from 'deepmerge'
import type { BaseBlock } from '@/types/edit'
const edit = useEditStore()
const list = ref<BaseBlock[]>([])

const callback = (params: { data: object; id: string }) => {
  const { data, id } = params
  if (!id) return
  const blockConfig = edit.blockConfig || []
  const newBlockConfig = findNodeById(blockConfig, id, (params: any) => {
    const { array, index, node } = params
    const overwriteMerge = (_destinationArray: any, sourceArray: any, _options: any) => sourceArray
    array[index].formData = deepmerge(node.formData, data, { arrayMerge: overwriteMerge })
  })
  edit.setBlockConfig(newBlockConfig)
  if (edit.currentSelect?.id === id) {
    const fd = deepmerge.all([edit.currentSelect.formData || {}, data])
    edit.setCurrentSelect({ ...edit.currentSelect, formData: fd })
  }
}

watch(
  () => edit.currentSelect,
  (value) => {
    const code = value?.code as BlockSchemaKeys
    const properties = blockSchema[code].properties
    if (!value || !properties) {
      list.value = []
      return
    }
    const { id, formData } = value as any

    const listResult = Object.fromEntries(
      Object.entries(properties).map((childItem) => {
        const [key, value] = childItem
        return [key, { ...value, id, key, formData: formData[key] || {} }]
      })
    )
    list.value = [...Object.values(listResult)]
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.edit-config-block {
  width: 100%;
}
</style>
