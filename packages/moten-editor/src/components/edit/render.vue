<template>
  <div class="edit-render" :class="{ 'is-mobile': edit.isMobileViewport }">
    <edit-render-drag :list="list" :group="dragGroup" class="render" />
    <el-empty v-if="!list?.length" description="请从左侧拖动组件到此处">
      <template #image>
        <v-icon icon="dragBlank" />
      </template>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import type { BaseBlock } from '@/types/edit'
import { computed, ref, watch } from 'vue'
import { dragGroup } from './nested'
import VIcon from '@/components/base/v-icon.vue'
import EditRenderDrag from '@/components/edit/render-drag.vue'
import { useEditStore } from '@/stores/edit'

const list = ref<BaseBlock[]>([])
const edit = useEditStore()

watch(
  () => list.value,
  (val) => {
    edit.setBlockConfig(val)
  },
  {
    deep: true
  }
)

watch(
  () => edit.blockConfig,
  (val) => {
    list.value = val
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.edit-render {
  container-type: inline-size;
  position: relative;
  width: 100%;
  min-height: calc(100vh - var(--edit-header-height));
  margin-left: var(--edit-block-width);
  margin-top: var(--edit-header-height);
  background: white;
  transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  &.is-mobile {
    width: 375px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(var(--edit-header-height) + 20px);
    margin-bottom: 20px;
    transform: translateX(10px);
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  }
  .empty {
    position: absolute;
    z-index: 0;
    top: 0;
    top: 0;
    width: inherit;
  }
  .render {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .el-empty {
    position: absolute;
    z-index: 0;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    pointer-events: none; // 防止遮挡拖拽
  }
}
</style>
