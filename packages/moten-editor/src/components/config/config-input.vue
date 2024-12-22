<template>
  <div class="config-input">
    <el-form-item :label="title">
      <el-input :placeholder="placeholder" class="input" v-model="input"></el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { ref, toRefs, watch } from 'vue'

const input = ref('')

const edit = useEditStore()

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

const emits = defineEmits(['callback'])

const { data } = toRefs(props)
const { formData, key, id } = data.value
const { title, placeholder, default: defaultValue } = data.value.properties[edit.viewport]

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true
  }
)

// TODO: 防抖
watch(input, (value) => {
  let data = {}
  const _value = value || ''

  if (Object.values(formData || {}).length < 2) data = { desktop: _value, mobile: _value }
  else data = { [props.viewport]: _value }

  emits('callback', {
    data: {
      [key]: data
    },
    id
  })
})
</script>

<style scoped lang="scss">
.config-input {
  :deep(.el-input__wrapper) {
    background: var(--color-config-block-bg);
  }
}
</style>
