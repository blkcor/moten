<template>
  <div class="edit">
    <edit-header />
    <div class="container" :class="{ 'mobile-background': edit.isMobileViewport }">
      <edit-block />
      <edit-render />
      <edit-config />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditHeader from '../components/edit/header.vue'
import EditBlock from '../components/edit/block.vue'
import EditRender from '../components/edit/render.vue'
import EditConfig from '../components/edit/config.vue'
import { useEditStore } from '@/stores/edit'

const edit = useEditStore()
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  overflow-x: hidden;
  user-select: none;
  --edit-header-height: 64px;
  --edit-block-width: 300px;
  .container {
    display: flex;
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
  }
}
</style>
