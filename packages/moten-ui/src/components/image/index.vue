<template>
  <div :class="classes">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" class="image" :src="src" :style="[styles, displayStyle]" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片,请上传"></mo-empty>
    </div>
  </div>
</template>
<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs, inject } from 'vue-demi'
import { props } from './props'
import MoLink from '../link'
import MoEmpty from '../empty'

const { name, n } = createNameSpace('image')

export default defineComponent({
  name: name,
  props,
  components: { MoLink, MoEmpty },
  setup(props) {
    const platform = inject('platform')
    const { data, viewport } = toRefs(props)
    const classes = computed(() => [n()])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const link = computed(() => data.value?.link?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))
    const displayStyle = computed(() => {
      if (platform === 'editor') {
        // 如果是editor端，当display为false时，显示为半透明
        return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        // 如果在user端，当display为false时，隐藏
        return display.value ? {} : { display: 'none' }
      }
    })
    return {
      classes,
      styles,
      display,
      src,
      link,
      displayStyle
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
