<template>
  <div :class="classes">
    <img v-bind="$attrs" class="image" :src="src" />
    <div class="description" v-html="description" />
  </div>
</template>
<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs } from 'vue-demi'
import { props } from './props'
import noDataImg from '@/assets/images/no-data.png'
const { name, n } = createNameSpace('empty')
export default defineComponent({
  name: name,
  props,
  setup(props) {
    const { image, description } = toRefs(props)
    const classes = computed(() => [n()])

    const src = computed(() => image.value || noDataImg)
    return {
      classes,
      src,
      description
    }
  }
})
</script>
<style scoped lang="scss">
@include b('empty') {
  width: 100%;
  text-align: center;
  margin: 0 auto;

  .image {
    object-fit: cover;
    display: block;
    margin: 0 auto;
    @include res(width, 80, 120);
  }

  .description {
    color: #909399;
    @include res(font-size, 16, 16);
    @include res(margin-top, 16, 16);
  }
}
</style>
