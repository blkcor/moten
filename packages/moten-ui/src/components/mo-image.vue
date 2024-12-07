<template>
  <img :src="src" />
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
