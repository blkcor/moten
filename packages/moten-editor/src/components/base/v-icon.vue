<template>
  <div class="icon">
    <el-tooltip :content="content" class-name="tip" effect="dark" :placement="placement">
      <div class="image-box">
        <Icon v-if="src" :icon="src" class="image" />
        <slot v-else class="image" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
  src: {
    type: String,
    default: ''
  },
  content: {
    type: String
  },
  placement: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
