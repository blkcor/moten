<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <v-icon-tooltip content="返回" icon="back" />
        <div class="header-title">页面</div>
      </div>

      <div class="line"></div>

      <v-select v-model="viewport" />
    </div>
    <div class="header-right">
      <el-button>
        <v-icon icon="preview" />
        预览
      </el-button>
      <el-button type="primary" @click="submit">
        <v-icon icon="publish" />
        发布
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Viewport } from '@/types/edit'
import { nextTick, ref, watch } from 'vue'
import VIcon from '@/components/base/v-icon.vue'
import VIconTooltip from '@/components/base/v-icon-tooltip.vue'
import VSelect from '@/components/base/v-select.vue'
import { useEditStore } from '@/stores/edit'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import {
  blockSchema,
  type BlockSchema,
  type BlockSchemaFormData,
  type BlockSchemaKeys
} from '@/config/schema'
import { findNodeById } from './nested'

const viewport = ref<Viewport>('desktop')
const edit = useEditStore()
const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'code']
})

AjvErrors(ajv)

const validateAll = async (item: {
  id: string | undefined
  value: Partial<BlockSchemaFormData[keyof BlockSchemaFormData]> | undefined
  schema: BlockSchema[BlockSchemaKeys]
}) => {
  const { id, value, schema } = item
  const validate = ajv.compile(schema)
  const valid = validate(value)
  if (!valid) {
    const path = validate.errors?.[0].instancePath
    if (path) {
      const [, , vp] = path.split('/')
      viewport.value = vp as Viewport
      edit.setViewport(vp as Viewport)
      edit.setConfigPanelShow(true)
      // viewport的更新会被watch监听，所以需要等待下一次tick
      await nextTick()
      //设置当前选择的组件为表单校验不通过的组件
      findNodeById(edit.blockConfig, id!, vp as Viewport, (params) => {
        const { node } = params
        edit.setCurrentSelect(node)
      })
    }
    console.error(
      'avj validate error: ',
      id,
      validate.errors?.[0].instancePath,
      validate.errors?.[0].message
    )
  }
  console.log('avj validate success: ', id)
}

const submit = () => {
  const list = edit.blockConfig.map((item) => {
    return {
      id: item.id,
      value: item.formData,
      schema: blockSchema[item.code as BlockSchemaKeys]
    }
  })
  list.forEach((item) => {
    validateAll(item)
  })
}

watch(
  () => viewport.value,
  (value) => {
    edit.setViewport(value)
    edit.setConfigPanelShow(edit.isMobileViewport)
    edit.setCurrentSelect(null)
  }
)
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  height: var(--edit-header-height);
  background: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .back {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      flex-shrink: 0;
      .header-title {
        font-size: 14px;
        padding-left: 4px;
      }
    }
    .line {
      width: 1px;
      height: 20px;
      border-left: 1px solid var(--color-border);
      padding-right: 16px;
    }
  }
  .header-right {
    position: relative;
    padding-right: 16px;
  }
}
</style>
