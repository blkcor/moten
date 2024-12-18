<template>
  <el-select v-model="viewport" placeholder="Select" style="width: 100px">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Viewport } from '@/types/edit'
type OptionProps = {
  value: Viewport
  label: string
}
const viewport = ref<Viewport>('desktop')

const options = reactive<OptionProps[]>([
  {
    value: 'desktop',
    label: '桌面端'
  },
  {
    value: 'mobile',
    label: '移动端'
  }
])
</script>

<style scoped lang="scss">
:deep(.el-select__wrapper) {
  font-weight: 800;
}
:deep(.el-select__suffix > .el-icon) {
  font-size: 18px;
  font-weight: 800;
  color: #8f8e8e;
}
</style>
