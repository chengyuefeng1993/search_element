<template>
  <div class="search">
    <NavBar/>
    <div style="flex-grow: 1;">
      <el-scrollbar ref="scrollBarRef" height="100vh" @scroll="scroll">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </router-view>
        <div class="back-to-top" ref="backTop" @click="scrollMove">
            <span>
                <el-icon><ArrowUpBold /></el-icon>
            </span>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useMainStore} from "@/stores";
import {ArrowUpBold} from '@element-plus/icons-vue'
import {ElScrollbar} from "element-plus";

const route = useRoute();
const mainStore = useMainStore();
const scrollBarRef = ref<InstanceType<typeof ElScrollbar>>()
const backTop = ref()
const scrollValue = ref(0)

const scroll = (a:{scrollTop:number}) => {
  scrollValue.value = a.scrollTop
  if (scrollValue.value >= 150) {
    backTop.value.style.display = 'flex';
  } else {
    backTop.value.style.display = 'none';

  }
}

const scrollMove = () => {
  scrollBarRef.value?.setScrollTop(0)
}

onMounted(() => {
  mainStore.routeUrl = String(route.name);
});

watch(
  () => route.name,
  (newValue) => {
    mainStore.routeUrl = String(newValue);
  }
);
</script>
<style scoped>
.search {
  display: flex;
  flex-direction: row;
  transition: .2s;
}
.back-to-top {
  position: fixed;
  width: 35px;
  height: 35px;
  right: 10px;
  bottom: 30px;
  /*border: 1px solid #616367;*/
  background-color: #409EFF;
  border-radius: 50%;
  padding: 3px 5px;
  display: none;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: var(--el-box-shadow-light);
  color: #dcdfe6;
}
.back-to-top > span{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
