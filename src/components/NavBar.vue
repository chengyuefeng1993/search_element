<template>
  <div class="nav-bar">
    <el-menu
      class="my-menu"
      style="border-right: none"
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
    <div class="collapse" >
      <div class="collapsed" @click="() => (data.collapsed = !data.collapsed)">
        <el-icon v-show="!data.collapsed">
          <ArrowLeftBold />
        </el-icon>
        <el-icon v-show="data.collapsed">
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ArrowLeftBold,
  ArrowRightBold,
  HomeFilled,
  Search,
  View,
} from "@element-plus/icons-vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

const data = ref({
  collapsed: true as boolean,
});
</script>

<style scoped>
.nav-bar {
  height: 100vh;
  border-right: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
}
.my-menu {
  flex: 1;
}
.collapse {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

}
.collapsed{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--el-border-color);
  border-radius: 50%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
}
.collapsed:hover {
  background-color: var(--el-color-info-light-9);
}
.collapsed:active{
  box-shadow:inset 0 0 8px 0 rgba(0, 0, 0, 0.1);
}
</style>
