<template>
  <div>
    <h1 class="text-red-200 text-sm">标题</h1>
    <img class="image" :src="src" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'mo-image',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log('hello moten image111')
  },
  setup() {
    return {
      //  src:props.src
    }
  }
})
</script>
<style scoped lang="scss">
.image {
  width: 500px;
  height: 300px;
}
</style>
