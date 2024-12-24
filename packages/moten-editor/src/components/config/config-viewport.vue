<template>
  <div class="config-viewport">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <config-base-tab :data="list" @change="change">
        <template #default="{ item }">
          <v-icon-tooltip :icon="item.icon" :content="item.content" class="icon" />
        </template>
      </config-base-tab>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import ConfigBaseTab from './base/config-base-tab.vue'
import { ref, toRef, toRefs, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  viewport: {
    type: String,
    default: 'desktop'
  }
})

const emits = defineEmits(['callback', 'update'])

const { data } = toRefs(props)
const { formData, key, id } = data.value
const { title, default: defaultValue } = data.value.properties[props.viewport]

export interface ViewportList {
  icon: string
  content: string
  value: 'all' | 'mobile' | 'desktop'
  default: boolean
}

const list = ref<ViewportList[]>([
  {
    icon: 'allViewport',
    content: '多端显示',
    value: 'all',
    default: false
  },
  {
    icon: 'mobile',
    content: '仅移动端显示',
    value: 'mobile',
    default: false
  },
  {
    icon: 'desktop',
    content: '仅桌面端显示',
    value: 'desktop',
    default: false
  }
])

const callback = (value: { desktop: boolean; mobile: boolean }) => {
  emits('callback', {
    data: {
      [key]: value
    },
    id
  })

  emits('update', {
    [key]: value
  })
}

const change = (value: ViewportList['value']) => {
  const rules = {
    all: { desktop: true, mobile: true },
    mobile: { desktop: false, mobile: true },
    desktop: { desktop: true, mobile: false }
  }
  callback(rules[value])
}

watch(
  () => formData,
  (value) => {
    const _formData = value?.[key]
    const defaultValueIndex = Math.max(
      list.value.findIndex((item) => item.value === _formData || defaultValue),
      0
    )
    list.value[defaultValueIndex].default = true
    change(list.value[defaultValueIndex].value)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.config-viewport {
  :deep(.el-form-item) {
    align-items: center;
  }
  .icon {
    :deep(.image-box) {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
