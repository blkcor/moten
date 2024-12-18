<template>
  <div class="edit">
    <edit-header />
    <div class="container">
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
</script>

<style lang="scss" scoped>
.edit {
  .container {
    display: flex;
  }
}
</style>
