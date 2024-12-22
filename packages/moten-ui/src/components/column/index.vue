<template>
  <div :class="classes" :style="styles">
    <div v-for="(item, index) in cols" :key="index" :style="itemStyle(item)" class="item">
      <slot :item="getItem(index)" :index="index" />
    </div>
  </div>
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
    const { data, viewport, children } = toRefs(props)
    // 获得子项
    const getItem = computed(() => (index: number) => children.value?.[index] || [])
    const classes = computed(() => [n()])
    const cols = computed(() => data.value.cols?.[viewport.value] || [0.5, 0.5])
    const background = computed(() => data.value.background?.[viewport.value] || '')
    const styles = computed(() => {
      background: background.value
    })
    const itemStyle = computed(() => (item: number | string) => ({
      width: Number(item) * 100 + '%'
    }))

    return {
      classes,
      cols,
      styles,
      children,
      itemStyle,
      getItem
    }
  }
})
</script>
<style scoped lang="scss">
@include b('column') {
  display: flex;
  justify-content: center;
  .item {
    min-height: 240px;
  }
}
</style>
