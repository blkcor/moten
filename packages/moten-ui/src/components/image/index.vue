<template>
  <div :class="classes">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" class="image" :src="src" :style="styles" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片,请上传"></mo-empty>
    </div>
  </div>
</template>
<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs } from 'vue-demi'
import { props } from './props'
import MoLink from '../link'
import MoEmpty from '../empty'

const { name, n } = createNameSpace('image')
export default defineComponent({
  name: name,
  props,
  components: { MoLink, MoEmpty },
  setup(props) {
    const { data, viewport } = toRefs(props)
    const classes = computed(() => [n()])
    const display = computed(() => data.value?.display?.[viewport.value] || '')
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const link = computed(() => data.value?.link?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))
    return {
      classes,
      styles,
      display,
      src,
      link
    }
  }
})
</script>
<style scoped lang="scss">
@include b('image') {
  .image {
    width: 100%;
    display: block;
    object-fit: cover;
    margin: 0 auto;
    @include res(height, 295, 295);
  }

  .no-image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    @include res(height, 295, 295);
  }
}

.image {
  width: 500px;
  height: 300px;
}
</style>
