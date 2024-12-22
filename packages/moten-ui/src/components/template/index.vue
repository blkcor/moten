<template>
  <div :class="classes"></div>
</template>
<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs } from 'vue-demi'
import { props } from './props'

const { name, n } = createNameSpace('column')
export default defineComponent({
  name: name,
  props,
  setup(props) {
    const {} = toRefs(props)
    const classes = computed(() => [n()])

    return {
      classes
    }
  }
})
</script>
<style scoped lang="scss">
@include b('column') {
}
</style>
