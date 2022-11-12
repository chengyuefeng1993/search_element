<template>
  <div class="nav-bar" style="height:100vh;border-right: 1px solid #4C4D4F;position: relative;">
    <el-menu style="border-right: none;"
             :collapse="data.collapsed"
             router
             :default-active="mainStore.routeUrl"
    >
      <el-menu-item index="home" route="/home">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item index="label" route="/search/label">
        <el-icon>
          <Search />
        </el-icon>
        <span>数据查询</span>
      </el-menu-item>
      <el-menu-item index="review" route="/search/review">
        <el-icon>
          <View />
        </el-icon>
        <span>回查</span>
      </el-menu-item>
    </el-menu>
    <el-button style="position:absolute;bottom: 0;width: 100%;" @click="() => data.collapsed=!data.collapsed">
      <el-icon v-show="!data.collapsed">
        <ArrowLeftBold />
      </el-icon>
      <el-icon v-show="data.collapsed">
        <ArrowRightBold />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import { ArrowLeftBold, ArrowRightBold, HomeFilled, Search, View } from '@element-plus/icons-vue'
import {useMainStore} from "@/stores";


const mainStore = useMainStore()

const data = ref({
  collapsed:true as boolean
})
</script>

<style scoped>

</style>
