<template>
  <div class="text"
       :style="{borderColor:props.item.reviewUser == null?'red':'green'}"
  >
    <div class="caption">
      <b v-html="item.caption" style="font-size: 16px"></b>
    </div>
    <div class="info">
      <span>dataId:{{ item.dataId }}</span><br>
      <span>{{ item.defaultCategory }}</span>
    </div>
    <el-divider style="margin: 5px 0;padding: 0"/>
    <div class="history">
      <p
        style="padding: 0;margin: 0"
        v-for="(i,index) in historyList"
        :key="index">
        {{ i }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {PropType} from "vue";
import type {DataType} from "@/types";

const props = defineProps({
  item: {
    type: Object as PropType<DataType>
  },
  historyList: Array as PropType<Array<string>>
})
</script>
<style scoped>
.text {
  width: 250px;
  border: 1px solid var(--el-border-color);
  padding: 5px;
  box-shadow: var(--el-box-shadow-light);
  text-align: center;
  font-size: 14px;
}
</style>
