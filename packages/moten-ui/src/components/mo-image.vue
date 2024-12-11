<template>
  <img class="image" :src="src" />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

// defineProps({
//   src: {
//     type: String,
//     required: true,
//   },
// })
export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log('hello moten image111')
  },
  setup() {
    return {
      //  src:props.src
    }
  },
})
</script>

<style scoped>
.image {
  width: 500px;
  height: 300px;
}
</style>
