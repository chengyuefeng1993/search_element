<template>
  <div class="search">
    <el-container>
      <el-aside style="height: 100vh;">
        <NavBar/>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';


</script>
<style scoped>
</style>
