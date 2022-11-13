<template>
  <transition name=".el-fade-in-linear">
    <div class="stage" v-show="isShow">
      <el-divider orientation="left">包数据</el-divider>
      <div class="stage-data">
        <span>总数：{{ props.stageList?.totalCount }}</span><br>
        <span>审核完成：{{ props.stageList?.finishedCount }}</span><br>
        <span>未领取：{{ props.stageList?.waitForMarkCount }}</span><br>
        <span>总暂跳：{{ props.stageList?.markingSkipCount }}</span><br>
        <span>已领取未提交：{{ props.stageList?.markingHandlingCount }}</span><br>
        <span>质检未领取：{{ props.stageList?.auditWaitForMarkCount }}</span><br>
        <span>质检暂跳：<span :style="{color:Number(props.stageList?.auditSkipCount)>0?'red':''}">{{
            props.stageList?.auditSkipCount
          }}</span></span><br>
        <span>质检领取未提交：{{ props.stageList?.unAuditCount }}</span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">

import type {PropType} from "vue";
import type {Stage} from "@/types";
import {computed} from "vue";

const props = defineProps({
  stageList: {
    type: Object as PropType<Stage>,
    default: () => {
      return {}
    }
  }
})

const isShow = computed(() => {
  return Object.getOwnPropertyNames(props.stageList).length>0
})
</script>
<style scoped>
.stage{
  border: 1px solid var(--el-border-color);
  padding: 5px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: 3px;
}
</style>
