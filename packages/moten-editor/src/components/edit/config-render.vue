<template>
  <div class="edit-config-render">
    <el-form label-width="auto" ref="ruleFormRef" :model="form" :rules="rules">
      <div v-for="(item, index) in list" :key="index">
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          :data="item"
          :viewport="edit.viewport"
          @callback="callback"
          @update="update"
        >
        </component>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { batchDynamicComponents } from '@/utils'
import type { FormInstance } from 'element-plus'
import { reactive, ref, watch } from 'vue'

const edit = useEditStore()
const getComponent = (item: any) => {
  const code = item.properties[edit.viewport].code
  return batchDynamicComponents(code, import.meta.glob('@/components/config/**/*.vue'))
}

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  schema: {
    type: Object,
    default: () => {}
  }
})

const ruleFormRef = ref<FormInstance>()
const form = reactive<any>({})

// transfer：将 schema 转换为 el-form 的 rules
const transfer = (b: any, key = 'default'): Record<any, any> => {
  return Object.fromEntries(
    Object.entries(b.properties).map((item: any) => {
      const [keyP, valueP] = item
      if (valueP.properties) {
        return [keyP, transfer(valueP, key)]
      }
      return [keyP, valueP[key]]
    })
  )
}

const rules = ref(transfer(props.schema, 'rules'))

const emits = defineEmits(['callback'])

const callback = (data: any) => {
  emits('callback', data)
}

// update: 每次formdata更新的时候给form赋值
const update = (params: any) => {
  console.log('🚀 ~ update ~ params:', params)
  const list = Object.entries(params || {})
  list.forEach(([key, value]) => {
    form[key] = value
  })
  console.log('🚀 ~ list.forEach ~ form:', form)
}

const submitForm = () => {
  setTimeout(() => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }, 100)
}

submitForm()

watch(
  () => props.list,
  () => {
    submitForm()
  }
)
</script>

<style scoped lang="scss">
.edit-config-render {
  overflow-y: auto;
  width: 100%;

  :deep(.el-form) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
}
</style>
