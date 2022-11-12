<template>
  <div class="search">
    <NavBar />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import {useMainStore} from "@/stores";

const route = useRoute()
const mainStore = useMainStore()
onMounted(() => {
  mainStore.routeUrl = String(route.name)
})
watch(() => route.name,(newValue) => {
  mainStore.routeUrl = String(newValue)
})
</script>
<style scoped>
.search {
  display: flex;
  flex-direction: row;
}
</style>
