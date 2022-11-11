<template>
  <el-config-provider :locale="zhCn">
    <div class="myapp">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {useDark} from "@vueuse/core";

const isDark = useDark()
</script>
<style scoped>
</style>
