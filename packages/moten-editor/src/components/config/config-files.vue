<template>
  <div class="config-files">
    <el-form-item :label="title">
      <img v-if="src" :src="src" class="image" @click="fileClick" />
      <div v-else class="file" @click="fileClick">
        <v-icon icon="upload" class="icon" />
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { ref, toRefs, watch } from 'vue'

const src = ref('')

const edit = useEditStore()

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  viewport: {
    type: String,
    default: 'desktop'
  }
})

const emits = defineEmits(['callback'])

const { data } = toRefs(props)
const { formData, key, id } = data.value
const { title, default: defaultValue } = data.value.properties[edit.viewport]

const fileClick = () => {
  const list = [
    'https://p3.itc.cn/q_70/images03/20230507/4a9e89ceb3a845b6bfe761e12ce6fceb.jpeg',
    'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/d28b060b9f3c40b93d57746dc2790df6.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_2560%2ch_1440',
    'https://p3.itc.cn/q_70/images03/20231210/dd93e4abc21f4710948ba94bf2db3695.jpeg'
  ]
  const index = Math.floor(Math.random() * list.length)
  src.value = list[index]
}

watch(
  () => formData,
  (value) => {
    src.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true
  }
)

// TODO: 防抖
watch(src, (value) => {
  let data = {}
  const _value = value || ''

  if (Object.values(formData || {}).length < 2) data = { desktop: _value, mobile: _value }
  else data = { [props.viewport]: _value }
  emits('callback', {
    data: {
      [key]: data
    },
    id
  })
})
</script>

<style scoped lang="scss">
.config-files {
  .file,
  .image {
    width: 80px;
    height: 80px;
    box-shadow: 0 0 0 1px var(--color-border) inset;
    border-radius: var(--border-radius);
    background: var(--color-config-block-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .is-error {
    .file,
    .image {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
  }
  .image {
    border: 0;
    width: 82px;
    height: 82px;
    object-fit: cover;
  }
  .icon {
    width: 26px;
    height: 26px;
  }
}
</style>
