<template>
  <component :is="tag" :class="classes" v-bind="$attrs" :to="to" :href="to" :target="target">
    <slot />
  </component>
</template>
<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs } from 'vue-demi'
import { props } from './props'
const { name, n } = createNameSpace('link')
export default defineComponent({
  name: name,
  props,
  setup(props) {
    const { to, target } = toRefs(props)
    const classes = computed(() => [n()])

    const isExternalLink = computed(() => {
      return to.value.match(/^(http:\/\/|https:\/\/|javascript:.*|tel.*|mailto:.*|sms:.*)/)
    })
    const tag = computed(() => {
      if (!to.value) return 'span'
      return isExternalLink.value ? 'a' : 'router-link'
    })

    return {
      classes,
      target,
      tag
    }
  }
})
</script>
<style scoped lang="scss">
@include b('link') {
}
</style>
