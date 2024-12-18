<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <div class="return">
          <v-icon :src="icon.return" content="返回" />
        </div>
        <div class="header-title">页面</div>
      </div>
      <div class="line"></div>
      <v-select v-model="viewpoint" />
    </div>
    <div class="header-right">
      <el-button>预览<v-icon content="预览" :src="icon.preview" /></el-button>
      <el-button type="primary">发布<v-icon content="发布" :src="icon.publish" /></el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Viewport } from '@/types/edit'
import { ref } from 'vue'
import VIcon from '@/components/base/v-icon.vue'
import VSelect from '@/components/base/v-select.vue'
import icon from '@/config/icon'

const viewpoint = ref<Viewport>('desktop')
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 1em 1em;
  font-size: large;
  border-bottom: 1px solid #cacacc;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
    .back {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      gap: 5px;
      .return {
        text-align: center;
        padding: 0.3em;
        box-sizing: content-box;
        &:hover {
          background: #bab8b8;
          cursor: pointer;
          border-radius: 30%;
        }
      }
      .header-title {
        font-weight: 600;
      }
    }

    .line {
      display: inline;
      border-left: 2px solid #8f8e8e;
      height: 70%;
    }
  }

  .header-right {
    display: flex;
  }
}
</style>
