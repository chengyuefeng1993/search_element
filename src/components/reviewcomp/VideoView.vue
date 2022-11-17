<template>
  <div class="video" :style="{ borderColor: props.item.reviewUser == null ? 'red' : 'green' }">
    <div class="caption">
      <el-tooltip placement="top">
        <template #content>
          {{ props.item.caption }}
        </template>
        <span class="caption-text">{{ props.item.caption }}</span>
      </el-tooltip>
    </div>
    <div class="img-view"></div>
    <div class="info">
      <p><b>{{ props.item.defaultCategory }}</b></p>
      <el-space :size="25">
        <span class="search-btn" @click="toVideo(props.item.name)">dataId:{{ props.item?.dataId }}</span>
        <span class="search-btn" @click="toBaiDu(props.item.defaultCategory)">百度</span>
      </el-space>
      <el-space :size="25">
        <span class="search-btn" @click="toKwai(props.item.defaultCategory)">快手</span>
        <span class="search-btn" @click="toKwaiInner(props.item.defaultCategory)">快手内部</span>
      </el-space>
    </div>
    <el-divider style="margin: 5px 0;" />
    <div class="history">
      <p v-for="(i, index) in historyList" :key="index">{{ i }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DataType } from '@/types';
import type { PropType } from 'vue';



const props = defineProps({
  item: {
    type: Object as PropType<DataType>,
    default: {}
  },
  historyList: {
    type: Array as PropType<Array<string>>,
    default: []
  }
})

const toVideo = (photoId: string) => {
  window.open(`https://ml.corp.kuaishou.com/media/api/video/trans?photoId=${photoId}`)
}
const toBaiDu = (q: string) => {
  window.open(`https://www.baidu.com/s?wd=${q}`)
}
const toKwai = (q: string) => {
  window.open(`https://www.kuaishou.com/search/video?searchKey=${q}`)
}
const toKwaiInner = (q: string) => {
  window.open(`https://ml.corp.kuaishou.com/v2/search/online-search?query=${q}`)
}
const toInnerUrl = (url: string) => {
  window.open(url)
}
</script>
<style scoped>
.video {
  width: 280px;
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  text-align: center;
  font-size: 14px;
  box-shadow: var(--el-box-shadow-light);
}

.caption {
  height: 30px;
}

.caption-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.search-btn {
  cursor: pointer;
  color: #616367;
}

.search-btn:hover {
  color: #79bbff;
}
</style>
